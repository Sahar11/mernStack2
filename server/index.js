import express from 'express';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import { Post } from './models/postModel.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
//Middleware for parsing request body
 app.use(express.json());

 app.use(cors());

app.get('/', (request, response) => {
  return response.status(234).send("Welcome to my Blog")
});


app.use('/posts', postRoutes)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => 
      console.log(`App is listening on Port, ${PORT}`))
    }).catch((error) => {
    console.log(error)
  })