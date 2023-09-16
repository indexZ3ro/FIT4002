const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser");

// Firebase initialization
const admin = require("firebase-admin");
const serviceAccount = require("../project-5389016526708021196-firebase-adminsdk-hitz3-cab5dbb661.json");
const { stat } = require("fs");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-5389016526708021196-default-rtdb.firebaseio.com",
});

const app = express();
const allowedOrigins = ["http://localhost:3000", "https://teamoji-matrix.web.app"]; // Add your frontend application's URL here

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

// Add body-parser middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// fetch all stickynotes for a particular project
app.get("/api/project/:projectKey/sticky-notes", (req, res) => {
  const { projectKey } = req.params;
  const notesRef = admin.database().ref(`Projects/${projectKey}/stickyNotes`);
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
  const projectKey = req.body.projectKey;
  const { x, y, text } = req.body;
  const notesRef = admin.database().ref(`Projects/${projectKey}/stickyNotes`);

  const newNoteRef = notesRef.push();
  const newNoteId = newNoteRef.key; // Get the newly generated ID
  newNoteRef
    .set({ text, x, y })
    .then(() => {
      res.status(201).json({ message: "Sticky note created successfully", id: newNoteId });
    })
    .catch((error) => {
      console.error("Error creating sticky note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API route for updating an existing sticky note
app.put("/api/sticky-notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  const { projectKey, x, y, text } = req.body;
  const notesRef = admin.database().ref(`Projects/${projectKey}/stickyNotes`);

  notesRef
    .child(noteId)
    .update({ x, y, text }) // Update the sticky note data
    .then(() => {
      // Send a success response back to the client
      res.status(200).json({ message: "Sticky note updated successfully", x:x });

      // If you want to notify clients about the update, you can do it here
      // For example, you can use a WebSocket to send real-time updates to connected clients
      const updatedNoteData = { id: noteId, x, y, text };
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(updatedNoteData));
      });
    })
    .catch((error) => {
      console.error("Error updating sticky note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API route for deleting a sticky note
app.delete("/api/sticky-notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  const { projectKey} = req.body;
  const notesRef = admin.database().ref(`Projects/${projectKey}/stickyNotes/${noteId}`);

  notesRef
    .remove()
    .then(() => {
      res.status(200).json({ message: "Sticky note deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting sticky note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// fetch all questions for a particular project
app.get("/api/project/:projectKey/questions", (req, res) => {
  const { projectKey } = req.params;
  const questionsRef = admin.database().ref(`Projects/${projectKey}/questions`);
  // Fetch all questions from the database
  questionsRef
    .once("value")
    .then((snapshot) => {
      const questionsData = snapshot.val();
      // Convert the questionsData object to an array of questions objects with IDs
      const questionsArray = Object.entries(questionsData || {}).map(
        ([key, value]) => ({ ...value, id: key })
      );
      res.json(questionsArray);
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
      res.status(500).json({ error: "Failed to fetch questions" });
    });
});

// API route for creating a question
app.post("/api/questions", (req, res) => {
  const projectKey = req.body.projectKey;
  const { text, type, status } = req.body;
  const questionRef = admin.database().ref(`Projects/${projectKey}/questions`);

  const newQuestionRef = questionRef.push();
  const newQuestionId = newQuestionRef.key; // Get the newly generated ID
  newQuestionRef
    .set({ text, type, status })
    .then(() => {
      res.status(201).json({ message: "Question created successfully", id: newQuestionId });
    })
    .catch((error) => {
      console.error("Error creating question:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/api/questions/:questionId", (req, res) => {
  const { questionId } = req.params;
  const { projectKey } = req.body;
  const questionRef = admin.database().ref(`Projects/${projectKey}/questions`);

  questionRef.once("value")
    .then((snapshot) => {
      const questionsData = snapshot.val();
      
      // Loop through the questions and update their status
      Object.keys(questionsData).forEach((key) => {
        if (key === questionId) {
          // Update the selected question to "active"
          questionRef.child(key).update({ status: "active" });
        } else {
          // Update all other questions to "inactive"
          questionRef.child(key).update({ status: "inactive" });
        }
      });

      // TODO: Ensure selected question loads for each user
      
      res.status(200).json({ message: "Status updated successfully" });
    })
    .catch((error) => {
      console.error("Error updating status: ", error);
      res.status(500).json({ error: "Internal server error" });
    });
});


// API route for updating a question
app.put("/api/questionDesc/:questionId", (req, res) => {
  const { questionId } = req.params;
  const { projectKey, text } = req.body;
  const questionRef = admin.database().ref(`Projects/${projectKey}/questions`);

  questionRef
    .child(questionId)
    .update({ text }) // Update the question data
    .then(() => {
      // Send a success response back to the client
      res.status(200).json({ message: "Question updated successfully"});

      // If you want to notify clients about the update, you can do it here
      // For example, you can use a WebSocket to send real-time updates to connected clients
      const updatedQuestionData = { id: questionId, text };
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(updatedQuestionData));
      });
    })
    .catch((error) => {
      console.error("Error updating question:", error);
      res.status(500).json({ error: "Internal server error" });
      console.log(error);
    });
});

// create a new project and return it
app.post("/api/createProject", (req, res) => {
  const { projectName, userID } = req.body;
  const projectsRef = admin.database().ref('Projects');

  const newProjectRef = projectsRef.push();

  const question1Id = admin.database().ref().push().key;
  const question2Id = admin.database().ref().push().key;
  const question3Id = admin.database().ref().push().key;
  const question4Id = admin.database().ref().push().key;

  const questions = {
    [question1Id]: {
      status: "active",
      text: "",
      type: 1
    },
    [question2Id]: {
      status: "inactive",
      text: "",
      type: 2
    },
    [question3Id]: {
      status: "inactive",
      text: "",
      type: 3
    },
    [question4Id]: {
      status: "inactive",
      text: "",
      type: 4
    }
  }

  const usersArr = {
    [userID]: {
      colour: "green"
    }
  }

  newProjectRef
    .set({
      name: projectName,
      questions: questions,
      admin: userID,
      users: usersArr
    })
    .then(() => {
      res.status(200).json({
        projectKey: newProjectRef.key
      });
    })
    .catch((error) => {
      console.error("Error creating new project:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/api/addUserToMatrix", (req, res) => {
  const { projectKey, userID } = req.body;
  const userRef = admin.database().ref(`Projects/${projectKey}/users`);

  userRef
    .child(userID)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        // If the User exists in the Matrix, return success
        res.status(200).json({ message: "User exists in Matrix"});
      } else {
        // To add user to the Matrix (No form of validation on if they should be added)
        const userNode = {
          [userID]: {
            colour: "blue"
          }
        }
      
        userRef.update(userNode).then(() => {
          res.status(201).json({ message: "User added successfully" });
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          res.status(500).json({ error: "Internal server error" });
        });
      }
    })
    .catch(error => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
  });

});

// API route for post a Emoji
app.post("/api/emoji", (req, res) => {
  const projectKey = req.body.projectKey;
  const { x, y, url } = req.body;
  const emojiRef = admin.database().ref(`Projects/${projectKey}/emoji`);

  const newEmojiRef = emojiRef.push();
  const newEmojiId = newEmojiRef.key; // Get the newly generated ID
  newEmojiRef
    .set({ url, x, y })
    .then(() => {
      res.status(201).json({ message: "Emoji created successfully", id: newEmojiId });
    })
    .catch((error) => {
      console.error("Error creating sticky note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API route for updating an existing emoji
app.put("/api/emoji/:emojiID", (req, res) => {
  const { emojiID } = req.params;
  const { projectKey, x, y, url } = req.body;
  const emojiRef = admin.database().ref(`Projects/${projectKey}/emoji`);

  emojiRef
    .child(emojiID)
    .update({ x, y, url }) // Update the sticky note data
    .then(() => {
      // Send a success response back to the client
      res.status(200).json({ message: "Emoji updated successfully", x:x });

      // If you want to notify clients about the update, you can do it here
      // For example, you can use a WebSocket to send real-time updates to connected clients
      const updatedEmojiData = { id: emojiID, x, y, url };
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(updatedEmojiData));
      });
    })
    .catch((error) => {
      console.error("Error updating emoji note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API route for deleting a sticky note
app.delete("/api/emoji/:emojiId", (req, res) => {
  const { emojiId } = req.params;
  const { projectKey} = req.body;
  const emojiRef = admin.database().ref(`Projects/${projectKey}/emoji/${emojiId}`);

  emojiRef
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
