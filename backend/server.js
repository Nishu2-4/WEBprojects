require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const chatgpt = require('./chatgpt');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (message) => {
    try {
      const reply = await chatgpt.generateReply(message);
      socket.emit('botReply', reply);
    } catch (error) {
      console.error('Error:', error);
      socket.emit('botReply', 'Sorry, I encountered an error.');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));