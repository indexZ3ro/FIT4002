const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file on all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
