const WebSocket = require('ws');

// サーバーのホストとポート
//const HOST = 'https://fcc123.xsrv.jp/test_higashiyama/Unity_Server/Node_websct_unity';
const HOST = '0.0.0.0'; // または '127.0.0.1', 実際のホストアドレスに合わせて設定
const PORT = 3000;

// WebSocketサーバーを作成
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`Server started on ws://${HOST}:${PORT}`);
});

// クライアントリスト
const clients = new Set();

// クライアント接続時の処理
wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    // クライアントからのメッセージを処理
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        onMessage(message);
    });

    // クライアント切断時の処理
    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });

    // エラー処理
    ws.on('error', (error) => {
        console.error(`Error: ${error.message}`);
        clients.delete(ws);
    });
});

// メッセージ受信処理
function onMessage(msg) {
    console.log(`Message from client: ${msg}`);
    // 必要に応じて全クライアントにメッセージをブロードキャスト
    broadcast(`Echo: ${msg}`);
}

// クライアントにメッセージを送信
function broadcast(msg) {
    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    }
}

// サーバー終了時の処理
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    wss.close(() => {
        console.log('Server closed');
    });
    process.exit();
});
