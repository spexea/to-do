import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || query.trim() === "") {
      return new Response(JSON.stringify({ error: "Invalid search query" }), {
        status: 400,
      });
    }

    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          {
            tags: {
              some: {
                name: { contains: query },
              },
            },
          },
        ],
      },
      include: {
        tags: true,
        subtasks: true,
      },
    });

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error("Error during search:", error);

    return new Response(
      JSON.stringify({ message: "Error fetching search results" }),
      { status: 500 }
    );
  } finally {
    prisma.$disconnect(); // Cerramos la conexión
  }
}
