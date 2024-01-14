import userModel from '../../models/UserModel.js';
import PostModel from '../../models/PostModel.js';

export const getFavorite = async(req,res) => {
    try {
        const user = await userModel.findOne({_id: req.userId});
        res.json({favorites:user.favorites})
    }catch (e){
        console.log(err);
        res.status(500).json({
          message: 'Не удалось сделать запрос. Попробуйте позже!'
        })
    }
}

export const add = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findOne({ _id: userId });
        const postId = req.body.id;
        const post = await PostModel.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Товар не найден. Попробуйте обновить страницу"
            });
        }

        const isExist = user.favorites.includes(postId);
        if (isExist) {
            return res.json({
                success: false,
                message: 'Товар уже был добавлен в избранное'
            });
        }

        await userModel.updateOne(
            { _id: userId },
            {
                $addToSet: { favorites: postId }
            }
        );

        res.json({ success: true, message: 'Товар успешно добавлен в избранное' });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Не удалось сделать запрос. Попробуйте позже!'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findOne({ _id: userId });
        const postId = req.body.id;
        const post = await PostModel.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Товар не найден. Попробуйте обновить страницу"
            });
        }

        const isExist = user.favorites.includes(postId);
        if (!isExist) {
            return res.json({
                success: false,
                message: 'Товар уже был удален из избранного'
            });
        }

        const updatedFavorites = user.favorites.filter(el => el != postId);

        await userModel.updateOne(
            { _id: userId },
            {
                favorites: updatedFavorites
            }
        );

        res.json({ success: true, message: 'Товар успешно удален из избранного' });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Не удалось сделать запрос. Попробуйте позже!'
        });
    }
};


