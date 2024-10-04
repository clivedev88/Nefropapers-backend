require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Middleware para interpretar JSON

// Importação das rotas
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes'); // Rotas para provas

// Uso das rotas
app.use('/auth', authRoutes); // Rotas para autenticação
app.use('/cursos', courseRoutes); // Rotas para cursos
app.use('/cursos', quizRoutes); // Rotas para provas (associadas a cursos)

// Verificação de variáveis de ambiente
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('Erro: Variáveis de ambiente Supabase não configuradas.');
  process.exit(1); // Finaliza o processo se as variáveis não estiverem configuradas
}

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
