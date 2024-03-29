import express from "express";
import * as UserController from './utils/controller/UserController.js'
import * as PostController from './utils/controller/PostController.js'
import cors from 'cors'
import mongoose from "mongoose";
import { loginValidation, registerValidation, postCreateValidation } from "./validation.js";
import checkAuth from "./utils/checkAuth.js";
import * as FavoriteController from './utils/controller/FavoriteController.js' 
import multer from "multer";  
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { check } from "express-validator";
import * as CategoryController from "./utils/controller/CategoryController.js";
import fs from 'fs'
import path from "path";

const app = express();
app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
  destination: (_,__,cb) => {
    cb(null, 'uploads');
  },
  filename: (_,file,cb) => {
    cb(null, file.originalname);
  },
});
app.get('/view-uploads', (req, res) => {
  // Передаем в ответе список файлов в папке uploads
  fs.readdir(path.join('./uploads'), (err, files) => {
    if (err) {
      return res.status(500).send('Ошибка чтения содержимого папки uploads');
    }
    res.send(files);
  });
});
const upload = multer({storage});


mongoose.connect('mongodb+srv://nuralim1232:nar!topo@marketdata.q9eyjpr.mongodb.net/data?retryWrites=true&w=majority')
.then(() => console.log('db ok'))
.catch((error) => console.log('error',error))


app.get('/', (req, res) => {
    console.log('worked');
  res.send('asds');
})

app.post('/auth/register',handleValidationErrors,upload.single('avatar'), UserController.register)
app.post('/auth/login',loginValidation, UserController.login)
app.get('/user/:id', UserController.getUser)
//
// app.post('/post',checkAuth,handleValidationErrors,upload.array('images'),postCreateValidation, PostController.post)
app.post('/post',checkAuth,handleValidationErrors,upload.array('images'),postCreateValidation, PostController.post)
app.get('/post', PostController.getAllPost)
app.get('/post/part/:id/:text?', PostController.getSearchedPostByCategory)
app.get('/post/user/:id', PostController.getUserPost)
app.get('/post/myPost/',checkAuth, PostController.getMyPost)

app.delete('/post/:id', checkAuth,PostController.remove )


app.patch('/status/:id',checkAuth,PostController.changeStatus)

//favorite
app.get('/post/favorite',checkAuth, FavoriteController.getFavorite)
app.patch('/post/favorite',checkAuth, FavoriteController.add)
app.patch('/post/deleteFavorite',checkAuth, FavoriteController.remove)

app.patch('/post/:id', checkAuth,upload.single('image'),PostController.updates )
app.get('/post/:id',PostController.getPostById)

app.post('/category',checkAuth,CategoryController.create)
app.get('/category',CategoryController.get)
app.listen(3000, () => {
  console.log('start');
})