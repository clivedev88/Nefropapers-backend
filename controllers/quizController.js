const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Função para listar provas por curso
exports.listQuizzesByCourse = async (req, res) => {
    const cursoId = req.params.cursoId; // Obtém o ID do curso dos parâmetros da URL
    const { data, error } = await supabase
        .from('provas')
        .select('*')
        .eq('id_curso', cursoId); // Filtra provas pelo ID do curso

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data); // Retorna as provas associadas ao curso
};

// Função para criar uma nova prova
exports.createQuiz = async (req, res) => {
    const cursoId = req.params.cursoId; // Obtém o ID do curso dos parâmetros da URL
    const { pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resp_corr, categoria } = req.body; // Obtém os dados da prova

    // Verifica se todos os campos obrigatórios foram enviados
    if (!pergunta || !opcao_a || !opcao_b || !opcao_c || !opcao_d || !resp_corr || !categoria) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const { data, error } = await supabase
        .from('provas')
        .insert([{
            id_curso: cursoId, // Relaciona a prova ao curso
            pergunta,
            opcao_a,
            opcao_b,
            opcao_c,
            opcao_d,
            resp_corr,
            categoria
        }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data); // Retorna a prova criada
};
