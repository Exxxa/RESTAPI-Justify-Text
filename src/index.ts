import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(34567, () => {
  console.log('Server running on http://91.170.250.88:34567/');
});

const MONGO_URL = 'mongodb+srv://pierre:HF7lmPHbxqxMr5qp@clusterinternship.ltbeauf.mongodb.net/?retryWrites=true&w=majority&appName=clusterinternship'; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
