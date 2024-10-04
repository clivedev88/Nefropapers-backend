const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotas para autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/resend-confirmation', authController.resendConfirmation);

module.exports = router;
