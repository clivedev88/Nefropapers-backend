const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Controlador de provas
exports.listQuizzesByCourse = async (req, res) => {
    const cursoId = req.params.cursoId;
    const { data, error } = await supabase
        .from('provas')
        .select('*')
        .eq('id_curso', cursoId);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
};

exports.createQuiz = async (req, res) => {
    const cursoId = req.params.cursoId;
    const { pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resp_corr, categoria } = req.body;

    if (!pergunta || !opcao_a || !opcao_b || !opcao_c || !opcao_d || !resp_corr || !categoria) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const { data, error } = await supabase
        .from('provas')
        .insert([{ id_curso: cursoId, pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resp_corr, categoria }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};

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
