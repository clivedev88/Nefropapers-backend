exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido.' });
    }
    // Verifique o token aqui...
    next();
};
