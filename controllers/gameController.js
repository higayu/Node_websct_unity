const gameState = require('../models/gameState');

exports.getGameStatus = (req, res) => {
    res.json(gameState.getStatus());
};

exports.updateGameStatus = (req, res) => {
    const { newStatus } = req.body;
    gameState.updateStatus(newStatus);
    res.status(200).send('Game status updated');
};
