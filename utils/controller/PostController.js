import { validationResult } from 'express-validator';
import postModel from '../../models/PostModel.js';
import UserModel from '../../models/UserModel.js';

export const post = async(req,res) => {
    try {
        const doc = new postModel({
            title: req.body.title,
            price: req.body.price,
            userId: req.userId,
            image: req.file.originalname,
            category: req.body.category,
            status:true
        })

        const post = await doc.save();
        
        res.json({post});
        
    } catch (err){
        console.log(err);
        res.status(500).json({
          message: 'Не удалось добавить'
        })
    }
};
export const getAllPost = async(req,res) => {
    try {
        const posts = await postModel.find({status: true});
        // const posts = await PostModel.find().populate('user').exec();
        // console.log(posts);
        
        res.json({posts});
        
    } catch (err){
        console.log(err);
        res.status(500).json({
          message: 'Не удалось получить публикации'
        })
    }
};

export const getSearchedPostByCategory = async(req,res) => {
    try {
        let posts;

        if(req.params.id != 0) {
            posts = await postModel.find({ category: req.params.id, status:true });
        } else {
            posts = await postModel.find({status:true });
        }

        if (req.params.text) {
            posts = posts.filter(el => {
                return el.title.toLowerCase().includes(req.params.text.toLowerCase());
            });
        }
    
        res.json(posts);
        
    } catch (err){
        console.log(err);
        res.status(500).json({
          message: 'Не удалось получить публикации'
        })
    }
};

export const getUserPost = async (req,res) => {
    try {
        const post = await postModel.find({userId:req.params.id})
        const userLiked = await UserModel.find({})
        res.json(post)

    }catch (err){
    console.log(err);
    res.status(500).json({
      message: ''
        })
        }
}

export const changeStatus = async (req,res) => {
    try {
        const postId = req.params.id;
        
        await postModel.updateOne(
            {
                _id:postId
            },
            {
                status:req.body.status
            }
        );
        
        res.json({
            success:true
        })

    }catch (err){
    console.log(err);
    res.status(500).json({
      message: 'не удалось сделать запрос. Попробуйте позже'
        })
        }
}



