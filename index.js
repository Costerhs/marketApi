import express from "express";
import * as UserController from './utils/controller/UserController.js'
import * as PostController from './utils/controller/PostController.js'
import cors from 'cors'
import mongoose from "mongoose";
import { loginValidation, registerValidation } from "./validation.js";
import checkAuth from "./utils/checkAuth.js";
import * as FavoriteController from './utils/controller/FavoriteController.js' 

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

app.post('/auth/register',registerValidation, UserController.register)
app.post('/auth/login',loginValidation, UserController.login)

app.post('/post',checkAuth, PostController.post)
app.get('/post', PostController.getAllPost)

app.patch('/post/favorite',checkAuth, FavoriteController.add)
app.get('/post/favorite',checkAuth, FavoriteController.getFavorite)
app.patch('/post/deleteFavorite',checkAuth, FavoriteController.remove)





app.listen(3000, () => {
  console.log('start');
})