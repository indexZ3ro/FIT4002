// server/index.js

const express = require("express");
const http = require('http');
const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const PORT = process.env.PORT || 8080;

// Firebase initialization
var admin = require('firebase-admin');
const serviceAccount = require('project-5389016526708021196-firebase-adminsdk-hitz3-cab5dbb661.json');
const db = admin.firestore();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-5389016526708021196-default-rtdb.firebaseio.com"
});

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
  
// Create a web server to serve files and listen to WebSocket connections
const server = http.createServer(app);

// Connect any incoming WebSocket connection to ShareDB
const wss = new WebSocket.Server({ server: server });

var backend = new ShareDB();
wss.on('connection', function(ws, req) {
  var stream = new WebSocketJSONStream(ws);
  backend.listen(stream);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});