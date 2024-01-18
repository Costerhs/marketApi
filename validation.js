import { body } from "express-validator"; 


export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('username', 'Имя должен быть минимум 3 символов').isLength({ min: 3 }),
    body('phone_number', 'Имя должен быть минимум 3 символов').isLength({ min: 9 }),
    body('avatar').optional().custom((value, { req }) => {
      if (!value) {
          return true;
      }
      try {
          Buffer.from(value, 'base64');
          return true;
      } catch (error) {
          throw new Error('Неверный формат файла. Ожидается base64');
      }
  }),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 })
];


export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тэгов').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];