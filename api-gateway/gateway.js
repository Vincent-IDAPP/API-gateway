require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');

const app = express();
const PORT = process.env.GATEWAY_PORT || 3000;

// Proxy vers le service d'auth
app.use('/', proxy('http://localhost:5001'));

app.listen(PORT, () => {
  console.log(`API Gateway en écoute sur le port ${PORT}`);
});
