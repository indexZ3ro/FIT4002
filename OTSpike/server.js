const AWS = require('aws-sdk');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const WebSocket = require('ws');
const DynamoDB = require('sharedb-dynamodb')(AWS);

// Set up AWS credentials and region
AWS.config.update({
  accessKeyId: '<your-access-key-id>',
  secretAccessKey: '<your-secret-access-key>',
  region: 'ap-southeast-2',
});

// Set up ShareDB with the DynamoDB connector
const backend = new ShareDB({
  db: new DynamoDB({
    table: 'test',
    hashKey: '<your-hash-key>',
    region: 'ap-southeast-2',
  }),
});

// Set up WebSocket server
const server = new WebSocket.Server({ port: 8080 });
server.on('connection', (webSocket) => {
  const stream = new WebSocketJSONStream(webSocket);
  backend.listen(stream);
});

// Set up ShareDB client
const socket = new WebSocket('ws://localhost:8080');
const connection = new ShareDB.Connection(socket);
const doc = connection.get('doc-collection', 'doc-id');
