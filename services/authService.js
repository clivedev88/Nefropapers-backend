const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Serviço para registrar um novo usuário
exports.registerUser = async (email, senha) => {
    return await supabase.auth.signUp({ email, password: senha });
};

// Serviço para login de um usuário
exports.loginUser = async (email, senha) => {
    return await supabase.auth.signInWithPassword({ email, password: senha });
};

// Serviço para reenviar e-mail de confirmação
exports.resendConfirmation = async (email) => {
    return await supabase.auth.resend({ email, type: 'signup' });
};
