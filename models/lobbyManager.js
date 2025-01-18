let lobbies = {}; // ロビー情報を保存

// ロビーを作成
const createLobby = (lobbyId) => {
    if (!lobbies[lobbyId]) {
        lobbies[lobbyId] = {
            players: [],
            maxPlayers: 4,
            isGameStarted: false,
        };
    }
    return lobbies[lobbyId];
};

// ロビーにプレイヤーを追加
const joinLobby = (lobbyId, player) => {
    const lobby = lobbies[lobbyId];
    if (lobby && lobby.players.length < lobby.maxPlayers) {
        lobby.players.push(player);
        return true;
    }
    return false;
};

// ロビーの状態を取得
const getLobbyStatus = (lobbyId) => {
    return lobbies[lobbyId];
};

// ロビーの全プレイヤーが準備完了か確認
const allPlayersReady = (lobbyId) => {
    const lobby = lobbies[lobbyId];
    return lobby.players.length > 0 && lobby.players.every((p) => p.isReady);
};

module.exports = {
    createLobby,
    joinLobby,
    getLobbyStatus,
    allPlayersReady,
};
