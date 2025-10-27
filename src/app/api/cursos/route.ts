import { supabase } from "@/services/supabase";

export async function POST(request: Request) {
  const { title, description, price, duration_hours, instructor, start_date } = await request.json();

  if (!title || !description || !price || !duration_hours || !instructor || !start_date) {
    return Response.json({ error: 'Faltan datos requeridos' }, { status: 400 });
  }

  const { data: curso, error } = await supabase
    .from('cursos')
    .insert([
      {
        title,
        description,
        price: typeof price === 'string' ? parseFloat(price) : price,
        duration_hours: typeof duration_hours === 'string' ? parseInt(duration_hours) : duration_hours,
        instructor,
        start_date,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error al crear curso:', error);
    return Response.json({ error: 'Error al crear curso' }, { status: 500 });
  }

  return Response.json({ success: true, curso });
}

export async function GET() {
  const { data: cursos, error } = await supabase
    .from('cursos')
    .select('*');

  if (error) {
    console.error('Error al traer cursos:', error);
    return Response.json({ error: 'Error al traer cursos' }, { status: 500 });
  }

  return Response.json({ success: true, cursos });
}

export async function PUT(request: Request) {
  const { id, title, description, price, duration_hours, instructor, start_date } = await request.json();

  if (!id || !title || !description || !price || !duration_hours || !instructor || !start_date) {
    return Response.json({ error: 'Faltan datos requeridos' }, { status: 400 });
  }

  const { data: curso, error } = await supabase
    .from('cursos')
    .update({
      title,
      description,
      price: typeof price === 'string' ? parseFloat(price) : price,
      duration_hours: typeof duration_hours === 'string' ? parseInt(duration_hours) : duration_hours,
      instructor,
      start_date,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar curso:', error);
    return Response.json({ error: 'Error al actualizar curso' }, { status: 500 });
  }

  return Response.json({ success: true, curso });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ error: 'ID del curso requerido' }, { status: 400 });
  }

  const { error } = await supabase
    .from('cursos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar curso:', error);
    return Response.json({ error: 'Error al eliminar curso' }, { status: 500 });
  }

  return Response.json({ success: true, message: 'Curso eliminado exitosamente' });
}
