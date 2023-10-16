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
const { isSet } = require("util/types");
const colourArr = [
  "#82ff76",
  "#8f97d4",
  "#ea759e",
  "#ffe4b5",
  "#f1ffa6",
  "#7dadff"
];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://project-5389016526708021196-default-rtdb.firebaseio.com",
});

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://teamoji-matrix.web.app",
]; // Add your frontend application's URL here

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
  const { x, y, text, height, width, noteColour } = req.body;
  const notesRef = admin.database().ref(`Projects/${projectKey}/stickyNotes`);

  const newNoteRef = notesRef.push();
  const newNoteId = newNoteRef.key; // Get the newly generated ID
  console.log(text)
  newNoteRef
    .set({ text, x, y, height,width, noteColour })
    .then(() => {
      res
        .status(201)
        .json({ message: "Sticky note created successfully", id: newNoteId });
    })
    .catch((error) => {
      console.error("Error creating sticky note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API route for updating an existing sticky note
app.put("/api/sticky-notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  const { projectKey, x, y, text, height, width } = req.body;
  const notesRef = admin.database().ref(`Projects/${projectKey}/stickyNotes`);

  notesRef
    .child(noteId)
    .update({ x, y, text, width, height }) // Update the sticky note data
    .then(() => {
      // Send a success response back to the client
      res
        .status(200)
        .json({ message: "Sticky note updated successfully", x: x });

      // If you want to notify clients about the update, you can do it here
      // For example, you can use a WebSocket to send real-time updates to connected clients
      const updatedNoteData = { id: noteId, x, y, text,width,height };
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
  const { projectKey } = req.body;
  const notesRef = admin
    .database()
    .ref(`Projects/${projectKey}/stickyNotes/${noteId}`);

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
      res
        .status(201)
        .json({ message: "Question created successfully", id: newQuestionId });
    })
    .catch((error) => {
      console.error("Error creating question:", error);
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
      res.status(200).json({ message: "Question updated successfully" });

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

// Updated question by type
app.post("/api/questionTypeUpdate", (req, res) => {
  const { projectId, type, text } = req.body;
  
  // Reference to all questions of the specified project
  const questionsRef = admin.database().ref(`Projects/${projectId}/questions`);

  // Fetching all questions and then filtering the one with the specified type
  questionsRef.once('value')
    .then(snapshot => {
      const questions = snapshot.val();
      const updates = {};

      // Loop through the questions to find the one with the specified type
      for (let id in questions) {
        if (questions[id].type === parseInt(type, 10)) {
            // Set the selected question to active and update its text
            updates[id] = { ...questions[id], text, status: "active" };
          } else {
            // Set other questions to inactive
            updates[id] = { ...questions[id], status: "inactive" };
          }
      }
      return questionsRef.update(updates);
    })
    .then(() => {
      res.status(200).json({ message: 'Question updated and others set to inactive' });
    })
    .catch(error => {
        console.error('Error updating questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
});


// create a new project and return it
app.post("/api/createProject", (req, res) => {
  const { projectName, userID, userName } = req.body;
  const projectsRef = admin.database().ref("Projects");

  const newProjectRef = projectsRef.push();

  const question1Id = admin.database().ref().push().key;
  const question2Id = admin.database().ref().push().key;
  const question3Id = admin.database().ref().push().key;
  const question4Id = admin.database().ref().push().key;

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const min = 100000; // Minimum 6-digit number
  const max = 999999;

  const projectAccessCode = Math.floor(Math.random() * (max - min + 1)) + min;

  const questions = {
    [question1Id]: {
      status: "active",
      text: "",
      type: 1,
    },
    [question2Id]: {
      status: "inactive",
      text: "",
      type: 2,
    },
    [question3Id]: {
      status: "inactive",
      text: "",
      type: 3,
    },
    [question4Id]: {
      status: "inactive",
      text: "",
      type: 4,
    },
  };

  var randChoice = Math.floor(Math.random() * (colourArr.length));
  const usersArr = {
    [userID]: {
      colour: colourArr[randChoice],
      status: "Active"
    },
  };

  newProjectRef
    .set({
      accessCode: projectAccessCode,
      name: projectName,
      questions: questions,
      admin: {
        userID: userID,
        userName: userName,
      },
      users: usersArr,
      dateCreated: formattedDate
    })
    .then(() => {
      res.status(200).json({
        projectKey: newProjectRef.key,
      });
    })
    .catch((error) => {
      console.error("Error creating new project:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/api/getAccessCode/:projectKey/:userID", (req, res) => {
  const { projectKey, userID } = req.params;
  const projectRef = admin.database().ref(`Projects/${projectKey}`);

  // Fetch the access code from the database
  projectRef
    .once("value")
    .then((snapshot) => {
      const adminRef = snapshot.val().admin;
      const adminID = adminRef.userID;
      if (adminID == userID) {
        const accessCode = snapshot
          ? snapshot.val().accessCode || false
          : false;
        res.json(accessCode);
      } else {
        res.json(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching access code:", error);
      res.status(500).json({ error: "Failed to fetch access code" });
    });
});

app.get("/api/getUserColour/:projectKey/:userID", async (req, res) => {

  const { projectKey, userID } = req.params;
  const userRef = admin.database().ref(`Projects/${projectKey}/users`);

  userRef
    .child(userID)
    .once("value")
    .then((snapshot) => {

      if (snapshot.exists()) {
        // Get Colour
        res.json({ message: "Colour found", colour: snapshot.val().colour });
      } else {
        console.error("Error finding user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
      
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/api/addUserToMatrix", (req, res) => {
  const { projectKey, userID } = req.body;
  const userRef = admin.database().ref(`Projects/${projectKey}/users`);

  userRef
    .child(userID)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        // If the User exists in the Matrix, return success
        res.status(200).json({ message: "User exists in Matrix" });
      } else {
      
        var randChoice = Math.floor(Math.random() * (colourArr.length));

        // To add user to the Matrix (No form of validation on if they should be added)
        const userNode = {
          [userID]: {
            colour: colourArr[randChoice],
            status: "Active"
          },
        };

        userRef
          .update(userNode)
          .then(() => {
            res.status(201).json({ message: "User added successfully" });
          })
          .catch((error) => {
            console.error("Error adding user:", error);
            res.status(500).json({ error: "Internal server error" });
          });
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/api/removeUserFromMatrix", (req, res) => {
  const { projectKey, userID } = req.body;
  const userRef = admin.database().ref(`Projects/${projectKey}/users`);
  userRef
    .child(userID)
    .update( { status: "Inactive" } )
    .then(() => {
      // To remove user from the Matrix (No form of validation on if they exist)
      res.status(201).json({ message: "User removed successfully" });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/api/checkUserAccess/:projectKey/:userID", (req, res) => {
  const { projectKey, userID } = req.params;
  const userRef = admin.database().ref(`Projects/${projectKey}/users`);

  userRef
    .child(userID)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        // If the User exists in the Matrix, return success
        res
          .status(200)
          .json({ message: "User exists in Matrix", status: true });
      } else {
        res.status(200).json({ message: "User does not exist", status: false });
      }
    })
    .catch((error) => {
      console.error("Error checking user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/api/joinMatrix", async (req, res) => {
  try {
    const { userID, accessCode } = req.body;
    const projectRef = admin.database().ref(`Projects/`);
    const projectSnapshot = await projectRef.once("value");
    const promises = [];
    let projectKey = null;

    projectSnapshot.forEach((projectChildSnapshot) => {
      const accessCodeCheck = projectChildSnapshot.val().accessCode;

      if (accessCodeCheck == accessCode) {
        projectKey = projectChildSnapshot.key;
        console.log(projectKey);
        const userRef = admin.database().ref(`Projects/${projectKey}/users`);

        const userPromise = userRef.child(userID).once("value");
        promises.push(userPromise);
      }
    });

    // Wait for all promises to settle
    const userSnapshots = await Promise.all(promises);

    if (promises.length === 0) {
      res.status(200).json({ message: "Incorrect Code", status: false });
      return;
    }

    let userExists = false;

    userSnapshots.forEach((userSnapshot) => {
      if (userSnapshot.exists()) {
        userExists = true;
      }
    });

    if (userExists) {
      res.status(200).json({
        message: "User exists in Matrix",
        status: true,
        projectKey: projectKey,
      });
    } else {

      var randChoice = Math.floor(Math.random() * (colourArr.length));
      // Add user to matrix
      const userNode = {
        [userID]: {
          colour: colourArr[randChoice],
          status: "Active"
        },
      };

      if (projectKey !== null) {
        const projectUsersRef = admin
          .database()
          .ref(`Projects/${projectKey}/users`);

        await projectUsersRef.update(userNode);
        res.status(201).json({
          message: "User joined successfully",
          status: true,
          projectKey: projectKey,
        });
      }
    }
  } catch (error) {
    console.error("Error joining matrix:", error);
    res.status(500).json({ error: "Failed to join matrix" });
  }
});

app.get("/api/getMatrixHistory/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const projectRef = admin.database().ref(`Projects/`);
    const snapshot = await projectRef.once("value");
    const promises = []; // Array to store promises

    snapshot.forEach((projectSnapshot) => {
      const projectKey = projectSnapshot.key;
      const usersRef = projectRef.child(`${projectKey}/users`);
      const notesRef = projectRef.child(`${projectKey}/stickyNotes`)

      if (projectSnapshot.exists()) {
        var numNotes = 0;
        const notes = notesRef
              .once("value")
              .then((notesSnapshot) => {
                numNotes = notesSnapshot.numChildren();
                if (notesSnapshot.exists()) {
                  numNotes = notesSnapshot.numChildren();
                } else {
                  numNotes = 0;
                }
        });
        const promise = usersRef
          .once("value")
          .then((userSnapshot) => {
            if (userSnapshot.exists() && userSnapshot.hasChild(userID) && userSnapshot.child(userID).val().status === 'Active') {
              

              

              const projectName = projectSnapshot.val().name; // Corrected property name
              const adminUser = projectSnapshot.val().admin;
              const adminUserName = adminUser ? adminUser.userName || "" : "";
              const dateCreated = projectSnapshot.val().dateCreated;
              const numUsers = userSnapshot.numChildren();

              const project = {
                projectKey: projectKey,
                projectName: projectName,
                adminUser: adminUser.userID,
                adminUserName: adminUserName,
                dateCreated: dateCreated,
                numUsers: numUsers,
                numNotes: numNotes
              };

              return project;
            }
            return null;
          })
          .catch((error) => {
            console.error("Error checking user key:", error);
            return null;
          });

        promises.push(promise);
      }
    });

    // Wait for all promises to settle
    const resolvedProjects = await Promise.all(promises);

    // Filter out null values
    const filteredProjects = resolvedProjects.filter(
      (project) => project !== null
    );

    res.json(filteredProjects);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// API route for post a Emoji
app.post("/api/emoji", (req, res) => {
  const projectKey = req.body.projectKey;
  const { x, y, url, height, width  } = req.body;
  const emojiRef = admin.database().ref(`Projects/${projectKey}/emoji`);

  const newEmojiRef = emojiRef.push();
  const newEmojiId = newEmojiRef.key; // Get the newly generated ID
  newEmojiRef
    .set({ url, x, y,height,width })
    .then(() => {
      res
        .status(201)
        .json({ message: "Emoji created successfully", id: newEmojiId });
    })
    .catch((error) => {
      console.error("Error creating sticky note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API route for updating an existing emoji
app.put("/api/emoji/:emojiID", (req, res) => {
  const { emojiID } = req.params;
  const { projectKey, x, y, url, height, width} = req.body;
  const emojiRef = admin.database().ref(`Projects/${projectKey}/emoji`);

  emojiRef
    .child(emojiID)
    .update({ x, y, url,height, width }) // Update the sticky note data
    .then(() => {
      // Send a success response back to the client
      res.status(200).json({ message: "Emoji updated successfully", x: x });

      // If you want to notify clients about the update, you can do it here
      // For example, you can use a WebSocket to send real-time updates to connected clients
      const updatedEmojiData = { id: emojiID, x, y, url,height, width };
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
  const { projectKey } = req.body;
  const emojiRef = admin
    .database()
    .ref(`Projects/${projectKey}/emoji/${emojiId}`);

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

// Add a review for a project
app.post("/api/add-review", async (req, res) => {
  const { projectId, date_time } = req.body;
  const projectRef = admin.database().ref(`Projects/${projectId}`);
  const reviewsRef = projectRef.child("Reviews");
  const usersRef = projectRef.child("users");

  try {
    const snapshot = await reviewsRef.once("value");
    if (!snapshot.exists()) {
      await projectRef.update({ Reviews: { dummyNode: true } }); // Create Reviews node under the project
    }

    const newReviewRef = await reviewsRef.push({ date_time, scores: {} });

    const usersSnapshot = await usersRef.once("value");
    if (usersSnapshot.exists()) {
      usersSnapshot.forEach((userSnapshot) => {
        const userId = userSnapshot.key;
        newReviewRef.child(`scores/${userId}`).set("null"); // Set initial value to null
      });
    }

    await projectRef.child("Reviews/dummyNode").remove(); // Remove the dummy node

    res.status(200).json({
      reviewId: newReviewRef.key,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/update-user-review", async (req, res) => {
  const { projectId, reviewId, userID, score } = req.body;

  try {
    const projectRef = admin.database().ref(`Projects/${projectId}`);
    const reviewRef = projectRef.child(`Reviews/${reviewId}/scores`);

    // Update the user's score
    await reviewRef.child(userID).set(score);

    res.status(200).json({
      message: "User review updated successfully",
    });
  } catch (error) {
    console.error("Error updating user review:", error);
    res.status(500).json({ error: "Internal server error", error: error.message });
  }
});






// Create a web server to serve files and listen to WebSocket connections
const server = http.createServer(app);

// Unused
// Connect any incoming WebSocket connection
const wss = new WebSocket.Server({ server });

// // Realtime Database event listeners
// const db = admin.database();
// const notesRef = db.ref("project/stickyNotes");

// // Send data to clients when data changes in the Realtime Database
// notesRef.on("value", (snapshot) => {
//   const notesData = snapshot.val();
//   const dataToSend = Object.entries(notesData || {}).map(([key, value]) => ({
//     ...value,
//     id: key,
//   }));
//   wss.clients.forEach((client) => {
//     client.send(JSON.stringify(dataToSend));
//   });

//   console.log("Data received from Realtime Database:", dataToSend);
// });

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
