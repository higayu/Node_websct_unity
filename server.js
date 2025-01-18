const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const config = require('config');

// ルートとソケットロジックのインポート
const apiRoutes = require('./routes/api');
const userRoutes = require('./routes/user');
const gameSocket = require('./sockets/gameSocket');

// サーバ設定
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // 必要に応じて許可するオリジンを設定
        methods: ['GET', 'POST']
    }
});

// ミドルウェア
app.use(express.json()); // JSONリクエストのパース
app.use(express.static('public')); // 静的ファイルの提供

// APIルートの登録
app.use('/api', apiRoutes);
app.use('/users', userRoutes);

// Socket.IO接続イベント
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);
    
    // ゲーム用のSocket.IOロジックを登録
    gameSocket(socket, io);

    // クライアント切断時の処理
    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`);
    });
});

// サーバ起動
const PORT = config.get('port') || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
