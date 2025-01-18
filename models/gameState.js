let gameStatus = {
    players: [],
    stage: 1,
    enemies: []
};

exports.getStatus = () => gameStatus;

exports.updateStatus = (newStatus) => {
    gameStatus = { ...gameStatus, ...newStatus };
};
