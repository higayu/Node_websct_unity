const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ユーザー登録
router.post('/register', userController.register);

// ユーザーログイン
router.post('/login', userController.login);

// 特定のユーザー情報取得
router.get('/:id', userController.getUser);

module.exports = router;
