const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Funções de autenticação
exports.registerUser = async (email, senha) => {
    return await supabase.auth.signUp({ email, password: senha });
};

exports.loginUser = async (email, senha) => {
    return await supabase.auth.signInWithPassword({ email, password: senha });
};

exports.resendConfirmation = async (email) => {
    return await supabase.auth.resend({ email, type: 'signup' });
};
