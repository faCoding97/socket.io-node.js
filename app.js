// Import the express package using ESM
import express from 'express';

// Import the socket.io package using ESM
import { createServer } from 'http';
import { Server } from 'socket.io';

// Create an instance of the express app
const app = express();

// Create an HTTP server using the app
const server = createServer(app);

// Create an instance of the socket.io server
const io = new Server(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Set up a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Set up a connection event listener
io.on('connection', (socket) => {
    console.log('A user connected');

    // Set up a message event listener
    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);

        // Broadcast the message to all connected clients
        io.emit('message', data);
    });

    // Set up a disconnection event listener
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set the port number
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
