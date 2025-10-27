import { supabase } from "@/services/supabase";

export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    const { data: existingUser } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .single();

    if (existingUser) {
        return Response.json({ error: 'El email ya está registrado' }, { status: 409 });
    }

    const { data: newUser, error } = await supabase
        .from('usuarios')
        .insert([
            { name, email, password, role: 'user' }
        ])
        .select('id, name, email, role')
        .single();

    if (error) {
        console.error('Error al crear usuario:', error);
        return Response.json({ error: 'Error al crear el usuario' }, { status: 500 });
    }

    return Response.json({ message: 'Usuario creado exitosamente', user: newUser }, { status: 201 });
}
