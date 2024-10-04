const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Rota para listar todos os cursos
router.get('/', courseController.listCourses);

// Rota para criar um novo curso
router.post('/', courseController.createCourse);

module.exports = router;
