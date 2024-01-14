import { validationResult } from 'express-validator';
import postModel from '../../models/PostModel.js';

export const post = async(req,res) => {
    try {
        // const errors = validationResult(req);

        // if(!errors.isEmpty()) {
        //     return res.status(400).json(errors.array());
        // }

        const doc = new postModel({
            title: req.body.title,
            price: req.body.price,
            userId: req.userId
        })

        const post = await doc.save();
        console.log(post);
        
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
        const posts = await postModel.find();
        // const posts = await PostModel.find().populate('user').exec();
        console.log(posts);
        
        res.json({posts});
        
    } catch (err){
        console.log(err);
        res.status(500).json({
          message: 'Не удалось получить публикации'
        })
    }
};


