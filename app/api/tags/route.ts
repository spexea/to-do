import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    // Buscar si la etiqueta ya existe
    const existingTag = await prisma.tag.findFirst({
      where: { name },
    });

    if (existingTag) {
      return new Response(JSON.stringify({ message: "Tag already exists" }), {
        status: 400,
      });
    }

    // Crear etiqueta nueva
    const tag = await prisma.tag.create({
      data: { name },
    });

    return new Response(JSON.stringify(tag), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating tag" }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tagName = url.searchParams.get("tag");

    if (tagName) {
      // Si se pasa un 'tag', filtramos las tareas asociadas a esa etiqueta
      const tasks = await prisma.task.findMany({
        where: {
          tags: { some: { name: tagName } },
        },
        include: { tags: true },
      });

      return new Response(JSON.stringify(tasks), { status: 200 });
    } else {
      // Si no se pasa 'tag', se devuelven todos los tags disponibles
      const tags = await prisma.tag.findMany();

      return new Response(JSON.stringify(tags), { status: 200 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching tags or tasks" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const tagId = parseInt(url.searchParams.get("id") || "0");

    if (isNaN(tagId)) {
      return new Response(JSON.stringify({ message: "Invalid tag ID" }), {
        status: 400,
      });
    }

    await prisma.tag.delete({
      where: { id: tagId },
    });

    return new Response(
      JSON.stringify({ message: "Tag deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting tag" }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const { tagId, name } = await req.json();

    const updatedTag = await prisma.tag.update({
      where: { id: tagId },
      data: { name },
    });

    return new Response(JSON.stringify(updatedTag), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating tag" }), {
      status: 500,
    });
  }
}
