import express from "express";
import * as UserController from './utils/controller/UserController.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    console.log('worked');
  res.send('asds');
})

app.post('/auth/register', UserController.register)


app.listen(3000, () => {
  console.log('start');
})