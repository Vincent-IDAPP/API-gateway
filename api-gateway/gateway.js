require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.GATEWAY_PORT || 3000;

app.use('/auth', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true
}));

app.listen(PORT, () => {
  console.log(`API Gateway en écoute sur le port ${PORT}`);
});