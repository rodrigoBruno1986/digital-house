import { supabase } from "@/services/supabase";

export async function POST(request: Request) {
  const { usuario_id, curso_id, documento, ciudad, edad } = await request.json();

  if (!usuario_id || !curso_id || !documento || !ciudad || !edad) {
    return Response.json({ error: 'Faltan datos requeridos' }, { status: 400 });
  }

  const { data: inscripcion, error } = await supabase
    .from('inscripciones')
    .insert([
      {
        usuario_id,
        curso_id,
        documento,
        ciudad,
        edad,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error al crear inscripción:', error);
    return Response.json({ error: 'Error al crear inscripción' }, { status: 500 });
  }

  return Response.json({ success: true, inscription: inscripcion });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const usuario_id = searchParams.get('usuario_id');

  if (!usuario_id) {
    return Response.json({ error: 'usuario_id es requerido' }, { status: 400 });
  }

  const { data: inscripciones, error } = await supabase
    .from('inscripciones')
    .select('*')
    .eq('usuario_id', usuario_id);

  if (error) {
    console.error('Error al traer inscripciones:', error);
    return Response.json({ error: 'Error al traer inscripciones' }, { status: 500 });
  }

  return Response.json({ success: true, inscriptions: inscripciones });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const usuario_id = searchParams.get('usuario_id');
  const curso_id = searchParams.get('curso_id');

  if (!usuario_id || !curso_id) {
    return Response.json({ error: 'usuario_id y curso_id son requeridos' }, { status: 400 });
  }

  const { error } = await supabase
    .from('inscripciones')
    .delete()
    .eq('usuario_id', usuario_id)
    .eq('curso_id', curso_id);

  if (error) {
    console.error('Error al eliminar inscripción:', error);
    return Response.json({ error: 'Error al eliminar inscripción' }, { status: 500 });
  }

  return Response.json({ success: true, message: 'Inscripción eliminada exitosamente' });
}
