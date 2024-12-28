import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed. Use POST." },
      { status: 405 }
    );
  }

  try {
    const { query } = await req.json();
    let tasks;

    if (query && typeof query === "string") {
      tasks = await prisma.task.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            {
              tags: {
                some: { name: { contains: query } },
              },
            },
          ],
        },
        include: {
          tags: true,
          subtasks: true,
        },
      });
    } else {
      tasks = await prisma.task.findMany({
        include: {
          tags: true,
          subtasks: true,
        },
      });
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
