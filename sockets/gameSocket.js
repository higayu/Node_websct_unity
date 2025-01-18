module.exports = (socket, io) => {
    socket.on('playerMove', (data) => {
        console.log('Player moved:', data);

        // 他のクライアントにブロードキャスト
        socket.broadcast.emit('playerMove', data);
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected');
    });
};
