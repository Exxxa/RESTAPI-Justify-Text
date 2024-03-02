import express from 'express'; // Import the Express framework
import http from 'http'; // Import the built-in HTTP module
import bodyParser from 'body-parser'; // Import middleware for parsing request bodies
import cookieParser from 'cookie-parser'; // Import middleware for parsing cookies
import compression from 'compression'; // Import middleware for HTTP compression
import cors from 'cors'; // Import middleware for enabling CORS (Cross-Origin Resource Sharing)

import router from './router'; // Import router module
import mongoose from 'mongoose'; // Import Mongoose library for MongoDB interactions

const app = express(); // Create an Express application

app.use(cors({ // Enable CORS middleware with options
  credentials: true, // Allow sending credentials
}));

app.use(compression()); // Use compression middleware for HTTP compression
app.use(cookieParser()); // Use cookie-parser middleware for parsing cookies
app.use(bodyParser.json()); // Use body-parser middleware for parsing JSON request bodies

const server = http.createServer(app); // Create an HTTP server using the Express app

server.listen(34567, () => { // Start the server and listen on port 34567
  console.log('Server running on http://myPersonalIP/'); // Log the server URL
});

const MONGO_URL = 'mongodb+srv://lopez:zrHWVTiNuwbyGge9@clusterinternship.ltbeauf.mongodb.net/?retryWrites=true&w=majority&appName=clusterinternship'; // MongoDB URI

mongoose.Promise = Promise; // Set Mongoose's promise library to the built-in JavaScript Promise
mongoose.connect(MONGO_URL); // Connect to MongoDB using the provided URI
mongoose.connection.on('error', (error: Error) => console.log(error)); // Log any errors that occur during the MongoDB connection

app.use('/', router()); // Use the router module to handle requests to the root URL ('/')

