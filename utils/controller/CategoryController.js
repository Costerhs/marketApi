import categoryModel from "../../models/CategoryModel.js"; 

export const create = async(req,res) => {
    try {
        const doc = new categoryModel({
            name:req.body.name,
            key:req.body.key
        });
        const category = await doc.save();

        res.json({category})

    } catch (err){
        console.log(err);
        res.status(500).json({
          message: 'Не удалось добавить категорию',
          err:err
        })
    }
}

export const get = async(req,res) => {
    try {
        const categories = await categoryModel.find();
        res.json({categories})
    } catch (err){
        console.log(err);
        res.status(500).json({
          message: 'Не удалось добавить категорию',
          err:err
        })
    }
}
