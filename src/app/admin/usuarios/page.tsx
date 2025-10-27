import { createClient } from "@supabase/supabase-js";
import { TableUser } from "@/components/TableUser";

export const dynamic = 'force-dynamic';


async function getUsuarios() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const supabaseClient = createClient(supabaseUrl, supabaseKey);
    
    const { data: usuarios, error } = await supabaseClient
      .from('usuarios')
      .select('id, name, email, role, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al traer usuarios:', error);
      return { usuarios: null, error };
    }

    return { usuarios: usuarios || [], error: null };
  } catch (error) {
    console.error('Error en getUsuarios:', error);
    return { usuarios: null, error };
  }
}

export default async function UsuariosPage() {
  const { usuarios, error } = await getUsuarios();

  if (error) {
    throw new Error('Error al cargar usuarios');
  }

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <a
            href="/admin"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </a>
          <h1 className="text-4xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-600 mt-2">Lista de usuarios registrados en la plataforma</p>
        </div>

        <TableUser usuarios={usuarios || []} />

        <div className="mt-6 text-sm text-gray-600">
          <p>Total de usuarios: <span className="font-semibold text-gray-900">{usuarios?.length || 0}</span></p>
        </div>
      </div>
    </div>
  );
}
