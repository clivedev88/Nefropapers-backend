const authService = require('../services/authService');

// Controlador de autenticação
exports.register = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const { data, error } = await authService.registerUser(email, senha);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
};

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const { data, error } = await authService.loginUser(email, senha);
    if (error) {
        return res.status(401).json({ error: error.message });
    }
    res.status(200).json(data);
};

exports.resendConfirmation = async (req, res) => {
    const { email } = req.body;

    const { error } = await authService.resendConfirmation(email);
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'E-mail de confirmação reenviado com sucesso.' });
};
