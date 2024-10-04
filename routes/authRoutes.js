const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importa o controlador de autenticação

// Rota para registrar um novo usuário
router.post('/register', authController.register);

// Rota para login
router.post('/login', authController.login);

// Rota para reenvio de confirmação de e-mail
router.post('/resend-confirmation', authController.resendConfirmation);

module.exports = router;
