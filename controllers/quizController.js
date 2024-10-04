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

// Função para criar uma nova prova individual
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

// Função para criar um simulado com base nas categorias e quantidades fornecidas
exports.createQuizFromCategories = async (req, res) => {
    const cursoId = req.params.cursoId;
    const { categorias } = req.body;

    if (!categorias || !Array.isArray(categorias) || categorias.length === 0) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    let questoesSelecionadas = [];

    try {
        for (const categoria of categorias) {
            if (!categoria.categoria || !categoria.quantidade) {
                return res.status(400).json({ error: 'Categoria e quantidade são obrigatórios.' });
            }

            const { data, error } = await supabase
                .from('provas')
                .select('*')
                .eq('id_curso', cursoId)
                .eq('categoria', categoria.categoria)
                .limit(categoria.quantidade);

            if (error) {
                return res.status(500).json({ error: `Erro ao buscar questões para a categoria ${categoria.categoria}: ${error.message}` });
            }

            questoesSelecionadas = [...questoesSelecionadas, ...data];
        }

        if (questoesSelecionadas.length === 0) {
            return res.status(404).json({ error: 'Nenhuma questão encontrada para as categorias fornecidas.' });
        }

        res.status(200).json({ questoes: questoesSelecionadas });
    } catch (error) {
        res.status(500).json({ error: `Erro ao criar o simulado: ${error.message}` });
    }
};
