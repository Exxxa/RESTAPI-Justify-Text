import express from 'express';
import justifyRouter from './routes/justify';
import tokenRouter from './routes/token';

const app = express();

app.use(express.json());
app.use(justifyRouter);
app.use(tokenRouter);

export default app;
