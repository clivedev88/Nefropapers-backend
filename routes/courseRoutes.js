const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Rotas para cursos
router.get('/', courseController.listCourses);
router.post('/', courseController.createCourse);

module.exports = router;
