const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Load the JWKS keys from the jwks.json file
const jwksFilePath = path.join(__dirname, 'jwks.json');

// Read the JWKS keys from the file
let jwksData;
try {
  jwksData = JSON.parse(fs.readFileSync(jwksFilePath, 'utf8'));
} catch (err) {
  console.error('Error reading JWKS file:', err);
  process.exit(1); // Exit the app if the JWKS file is not found or cannot be parsed
}

// Expose the JWKS endpoint
app.get('/.well-known/jwks.json', (req, res) => {
  res.json(jwksData);
});

// Start the Express app
app.listen(port, () => {
  console.log(`JWKS endpoint is live at http://localhost:${port}/.well-known/jwks.json`);
});
