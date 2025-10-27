import { supabase } from "@/services/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json({ error: 'ID de usuario requerido' }, { status: 400 });
    }

    const { data: inscripciones, error } = await supabase
      .from('inscripciones')
      .select(`
        curso_id,
        cursos (
          id, title, description, price, 
          duration_hours, instructor, start_date
        )
      `)
      .eq('usuario_id', userId);

    if (error) {
      console.error('Error al obtener cursos del usuario:', error);
      return Response.json({ error: 'Error al obtener cursos del usuario' }, { status: 500 });
    }

    const cursos = inscripciones?.map(inscripcion => inscripcion.cursos).filter(Boolean) || [];

    return Response.json({ success: true, cursos });
  } catch (error) {
    console.error('Error en API mis-cursos:', error);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
