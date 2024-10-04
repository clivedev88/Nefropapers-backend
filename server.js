require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// CORS e BodyParser
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(bodyParser.json());

// Rotas
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');

app.use('/auth', authRoutes);
app.use('/cursos', courseRoutes);
app.use('/cursos', quizRoutes);

// Checagem de variáveis de ambiente
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('Erro: Variáveis de ambiente Supabase não configuradas.');
  process.exit(1);
}

app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
