const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Controlador de cursos
exports.listCourses = async (req, res) => {
    const { data, error } = await supabase
        .from('cursos')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
};

exports.createCourse = async (req, res) => {
    const { titulo, descricao } = req.body;

    const { data, error } = await supabase
        .from('cursos')
        .insert([{ titulo, descricao }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};
