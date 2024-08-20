
const socket = io();

socket.on('connect', () => {
  console.log('Connected to server with socket ID:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
