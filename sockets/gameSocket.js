module.exports = (socket, io) => {
    socket.on('playerMove', (data) => {
        console.log('Player moved:', data);

        // 他のクライアントにプレイヤーの移動情報を送信
        socket.broadcast.emit('playerMove', data);
    });

    socket.on('ready', (data) => {
        console.log('Player ready:', data);

        // ロビー内のプレイヤーに通知
        io.emit('playerReady', data);
    });
};
