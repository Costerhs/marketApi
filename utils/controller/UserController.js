import brcypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import userModel from '../../models/UserModel.js';
import jwt from "jsonwebtoken"; 
import PostModel from '../../models/PostModel.js';

export const register = async(req,res) => {
    try {
        const password = req.body.password;
        const salt = await brcypt.genSalt(10);
        const hash = await brcypt.hash(password,salt);

        const doc = new userModel({
            username: req.body.username,
            email: req.body.email,
            passwordHash: hash,
        })

        const user = await doc.save();

        const token = jwt.sign(
            {
            _id: user._id,
            },
             'secret123',
             {
              expiresIn: '30d'
             }
          );

          const {passwordHash, ...userData} = user._doc;

          res.json({...userData,token});
        
    } catch (err){
        console.log(err);
        res.status(500).json({
          message: 'Похоже такая почта уже используется. Попробуйте другой'
        })
    }
};



export const login = async(req,res) => {
    try {
    const user = await userModel.findOne({email: req.body.email});
    if(!user) {
        return res.status(404).json({
            message: "пользователь не найден"
        });
    };

    const isValid = await brcypt.compare(req.body.password,user.passwordHash);
    if(!isValid) {
        return res.status(404).json({
            message: "неверный логин или пароль"
        });
    }

    const token = jwt.sign(
        {
        _id: user._id,
        },
         'secret123',
         {
          expiresIn: '30d'
         }
      );
  
      const {passwordHash, ...userData} = user._doc
  
      res.json({...userData,token});
    } catch (err){
        console.log(err);
        res.status(500).json({
          message: 'неправильный пароль или логин'
        })
    }
}
