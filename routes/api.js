const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// ゲームステータスを取得
router.get('/game-status', gameController.getGameStatus);

// ゲームステータスを更新
router.post('/game-status', gameController.updateGameStatus);

module.exports = router;
