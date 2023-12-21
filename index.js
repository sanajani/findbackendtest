import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import DB_CONNECTION from './db/db.connect.js';
import cors from 'cors'
import contactRouter from './routes/contact.router.js';
import bodyParser from 'body-parser';
const BASE_URL = process.env.BASE_URL ||'http://localhost'

import userRouter from './routes/user.router.js'
import { globalErrorHandler } from './controllers/error.controller.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 9808;

app.listen(PORT,() => {
    DB_CONNECTION();
    console.log(`${BASE_URL}:${PORT}`);
})

app.use('/api/v1/user',userRouter)
app.use('/api/v1/mail',contactRouter)


// global page not found
app.all("*",(req,res,next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 'fail'
  error.statusCode = 404
  next(error)
})

// Error handling middleware
app.use(globalErrorHandler);