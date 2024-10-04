const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController'); // Importa o controlador de provas

// Rota para listar provas por curso
router.get('/:cursoId/provas', quizController.listQuizzesByCourse);

// Rota para criar uma nova prova individual
router.post('/:cursoId/provas', quizController.createQuiz);

// Rota para criar um simulado com base nas categorias
router.post('/:cursoId/simulados', quizController.createQuizFromCategories);

module.exports = router;
