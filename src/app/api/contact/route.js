import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eyaraedkwjgspknimmfb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YXJhZWRrd2pnc3BrbmltbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI4MTgsImV4cCI6MjA1MjMzODgxOH0.6GEOM6YASqLMdFYTmNW7ceebdOKKxtVMQjUqlm8VWWg";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const { data: contacts, error } = await supabase
    .from("contacto")
    .select("*")
    .order("nombre", { ascending: true });

  return new Response(JSON.stringify(contacts), { status: 200 });
}

export async function DELETE(request) {
  const body = await request.json();
  const id = body.id;

  const { data: deleteData, error } = await supabase
    .from("contacto")
    .delete()
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }

  return new Response(JSON.stringify({ success: "eliminado con éxito" }), {
    status: 200,
  });
}

export async function POST(request) {
  const body = await request.json();
  const contacto = body.contact;

  if (
    contacto.nombre !== "" &&
    contacto.apellidos !== "" &&
    contacto.numTelefono !== "" &&
    contacto.correo !== ""
  ) {
    const telefonoValido = /^[0-9]{9}$/;
    const correoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (telefonoValido.test(numTelefono) && correoValido.test(correo)) {
      const { data: postData, error } = await supabase
        .from("contacto")
        .insert(contacto);
      if (!error) {
        return new Response(JSON.stringify({ success: "Creado con éxito" }), {
          status: 201,
        });
      }
    } else {
      return new Response(
        JSON.stringify({
          error: "Campo correo o campo telefono no sigue el patrón correcto",
        }),
        { status: 400 }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ error: "Alguno de los campos esta vacío" }),
      { status: 400 }
    );
  }

  return new Response(JSON.stringify(error), { status: 400 });
}

export async function PUT(request) {
  const body = await request.json();
  const id = body.id;
  const { data: updateData, error } = await supabase
    .from("contacto")
    .update(body.update)
    .eq("id", id);
  return new Response(
    JSON.stringify({ success: "actualizado" }, { status: 200 })
  );
}
