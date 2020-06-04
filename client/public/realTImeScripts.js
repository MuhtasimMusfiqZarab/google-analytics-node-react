// to have out client sent message to to the server this script is needed

const socket = io.connect();
socket.on('connect', function () {
  socket.send(window.location);
});
