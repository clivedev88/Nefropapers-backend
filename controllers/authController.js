const authService = require('../services/authService');

// Função para registrar um novo usuário
exports.register = async (req, res) => {
    const { email, senha } = req.body; // Pegando e-mail e senha do corpo da requisição
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const { data, error } = await authService.registerUser(email, senha); // Chama o serviço de autenticação para registrar
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data); // Retorna os dados do usuário registrado
};

// Função para login
exports.login = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const { data, error } = await authService.loginUser(email, senha); // Chama o serviço de autenticação para login
    if (error) {
        return res.status(401).json({ error: error.message });
    }
    res.status(200).json(data); // Retorna os dados do usuário logado
};

// Função para reenvio de confirmação de e-mail
exports.resendConfirmation = async (req, res) => {
    const { email } = req.body;

    const { error } = await authService.resendConfirmation(email);
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'E-mail de confirmação reenviado com sucesso.' });
};
