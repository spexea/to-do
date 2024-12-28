// Path: app/api/tasks/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Definimos un tipo para nuestras respuestas de API
type Task = {
  id: number;
  title: string;
  description?: string | null;
  dueDate?: Date | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Manejar el método GET
export async function GET(req: Request) {
  try {
    const tasks = await prisma.task.findMany({
      include: { tags: true }, // Incluir etiquetas relacionadas
    });
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching tasks" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, dueDate, tags } = await req.json();

    // Primero, nos aseguramos de que los tags existan, o los creamos
    const tagsToConnect = await Promise.all(
      tags.map(async (tag: string) => {
        // Buscar el tag en la base de datos
        const existingTag = await prisma.tag.findFirst({
          where: { name: tag },
        });

        // Si no existe el tag, lo creamos
        if (existingTag) {
          return existingTag;
        }

        // Si no existe, lo creamos
        return await prisma.tag.create({
          data: { name: tag },
        });
      })
    );

    // Crear la tarea con los tags
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        tags: {
          connect: tagsToConnect.map((tag) => ({ id: tag.id })),
        },
      },
      include: { tags: true }, // Incluir las etiquetas asociadas
    });

    return new Response(JSON.stringify(task), { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error); // Log para facilitar la depuración
    return new Response(
      JSON.stringify({
        message: "Error creating task",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const { id, title, description, dueDate, completed, tags } =
      await req.json();

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        completed,
        tags: tags
          ? {
              set: [], // Eliminar todas las etiquetas anteriores
              connect: tags.map((tag: string) => ({ name: tag })),
            }
          : undefined,
      },
      include: { tags: true },
    });

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating task" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const subtaskId = parseInt(url.searchParams.get("id") || "0");

    await prisma.task.delete({
      where: { id: subtaskId },
    });

    return new Response(
      JSON.stringify({ message: "Subtask deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting subtask" }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const { subtaskId, completed } = await req.json();

    const updatedSubtask = await prisma.task.update({
      where: { id: subtaskId },
      data: { completed },
    });

    return new Response(JSON.stringify(updatedSubtask), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating subtask" }), {
      status: 500,
    });
  }
}
