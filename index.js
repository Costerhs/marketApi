import express from "express";
import * as UserController from './utils/controller/UserController.js'
import cors from 'cors'
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect('mongodb+srv://nuralim1232:nar!topo@marketdata.q9eyjpr.mongodb.net/data?retryWrites=true&w=majority')
.then(() => console.log('db ok'))
.catch((error) => console.log('error',error))


app.get('/', (req, res) => {
    console.log('worked');
  res.send('asds');
})

app.post('/auth/register', UserController.register)
app.post('/auth/login', UserController.login)

app.listen(3000, () => {
  console.log('start');
})