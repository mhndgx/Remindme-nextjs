"use server";
import { prisma } from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found!");
  }
  console.log("adding", data);
  const { content, collectionId, expiresAt } = data;

  return await prisma.task.create({
    data: {
      userId: user.id,
      content: content,
      expireAt: expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
}

export async function setTaskDone(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.task.update({
    where: {
      id: id,
      userId: user?.id,
    },
    data: {
      done: true,
    },
  });
}
