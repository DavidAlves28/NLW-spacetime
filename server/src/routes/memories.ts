import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  
  app.get("/memories", async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat("..."),
        createdAt: memory.createdAt
      };
    });
  });

  app.get("/memories/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);
    const memories = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });
    if (!memories.isPublic && memories.userId !== request.user.sub) {
      return reply.status(401).send("Não A");
    }
    return memories;
  });

  //create
  app.post("/memories", async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);
    const memories = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      },
    });
    return memories;
  });
  //update
  app.put("/memories/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);
    let memoryExist = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (memoryExist.userId !== request.user.sub) {
      reply.status(401).send("N");
    }
    const memoryUpdate = await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    });
    return memoryUpdate;
  });

  //delete
  app.delete("/memories/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);
    let memoryExist = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });
    if (memoryExist.userId !== request.user.sub) {
      reply.status(401).send("N");
    }
    await prisma.memory.delete({
      where: {
        id,
      },
    });
  });
}
