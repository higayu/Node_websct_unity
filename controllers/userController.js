const users = []; // 仮のユーザーデータストア

/**
 * ユーザーを登録する
 * @param {*} req
 * @param {*} res
 */
exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // 重複チェック
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
    }

    // ユーザーを登録
    const newUser = {
        id: users.length + 1,
        username,
        password, // 実際にはパスワードはハッシュ化するべき (例: bcrypt)
        createdAt: new Date(),
    };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

/**
 * ユーザーをログインさせる
 * @param {*} req
 * @param {*} res
 */
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // ユーザー検索
    const user = users.find((user) => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // 仮トークン（実際にはJWTなどを使うべき）
    const token = `token-${user.id}-${new Date().getTime()}`;

    res.status(200).json({ message: 'Login successful', token, user });
};

/**
 * ユーザー情報を取得する
 * @param {*} req
 * @param {*} res
 */
exports.getUser = (req, res) => {
    const { id } = req.params;

    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
};
