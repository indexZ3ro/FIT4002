const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const PORT = process.env.PORT || 8080;

// Firebase initialization
const admin = require("firebase-admin");
const serviceAccount = require("../project-5389016526708021196-firebase-adminsdk-hitz3-cab5dbb661.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-5389016526708021196-default-rtdb.firebaseio.com",
});

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
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
