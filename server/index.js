const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const PORT = process.env.PORT || 8080;
const cors = require("cors");

// Firebase initialization
const admin = require("firebase-admin");
const serviceAccount = require("../project-5389016526708021196-firebase-adminsdk-hitz3-cab5dbb661.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-5389016526708021196-default-rtdb.firebaseio.com",
});

const app = express();
const allowedOrigins = ["http://localhost:3000"]; // Add your frontend application's URL here

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the origin is in the allowed origins list
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// fetch all stickynotes
app.get("/api/sticky-notes", (req, res) => {
  // Fetch all sticky notes from the database
  notesRef
    .once("value")
    .then((snapshot) => {
      const notesData = snapshot.val();
      // Convert the notesData object to an array of notes objects with IDs
      const notesArray = Object.entries(notesData || {}).map(
        ([key, value]) => ({ ...value, id: key })
      );
      res.json(notesArray);
    })
    .catch((error) => {
      console.error("Error fetching sticky notes:", error);
      res.status(500).json({ error: "Failed to fetch sticky notes" });
    });
});

// create sticky note
app.post("/api/sticky-notes", (req, res) => {
  const { text, x, y } = req.body;
  const notesRef = admin.database().ref("project/stickyNotes");

  const newNoteRef = notesRef.push();
  newNoteRef
    .set({ text, x, y })
    .then(() => {
      res.status(201).json({ message: "Sticky note created successfully" });
    })
    .catch((error) => {
      console.error("Error creating sticky note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API route for updating an existing sticky note
app.put("/api/sticky-notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  const { text, x, y } = req.body;
  const notesRef = admin.database().ref("project/stickyNotes");

  notesRef
    .child(noteId)
    .update({ text, x, y })
    .then(() => {
      res.status(200).json({ message: "Sticky note updated successfully" });
    })
    .catch((error) => {
      console.error("Error updating sticky note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API route for deleting a sticky note
app.delete("/api/sticky-notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  const notesRef = admin.database().ref("project/stickyNotes");

  notesRef
    .child(noteId)
    .remove()
    .then(() => {
      res.status(200).json({ message: "Sticky note deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting sticky note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Create a web server to serve files and listen to WebSocket connections
const server = http.createServer(app);

// Connect any incoming WebSocket connection
const wss = new WebSocket.Server({ server });

// Realtime Database event listeners
const db = admin.database();
const notesRef = db.ref("project/stickyNotes"); // Replace "stickyNotes" with your desired database path

// Send data to clients when data changes in the Realtime Database
notesRef.on("value", (snapshot) => {
  const notesData = snapshot.val();
  const dataToSend = Object.entries(notesData || {}).map(([key, value]) => ({ ...value, id: key }));
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(dataToSend));
  });

  console.log("Data received from Realtime Database:", dataToSend);
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});