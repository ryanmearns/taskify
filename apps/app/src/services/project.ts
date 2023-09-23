import { projects } from "@/db/schema";
import { ProjectSchema } from "@/db/types";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getProjects = async (
  arg: Pick<ProjectSchema, "workspaceUuid">
) => {
  return await db.query.projects.findMany({
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    where: eq(projects.workspaceUuid, arg.workspaceUuid),
    with: {
      todos: true,
    },
  });
};

export const getProject = async (
  arg: Pick<ProjectSchema, "uuid" | "workspaceUuid">
) => {
  return await db.query.projects.findFirst({
    where: and(
      eq(projects.uuid, arg.uuid),
      eq(projects.workspaceUuid, arg.workspaceUuid)
    ),
    with: {
      todos: true,
    },
  });
};

export const createProject = async (arg: Omit<ProjectSchema, "uuid">) => {
  return await db.insert(projects).values({ uuid: nanoid(8), ...arg });
};

export const updateProject = async (arg: ProjectSchema) => {
  return await db
    .update(projects)
    .set(arg)
    .where(
      and(
        eq(projects.uuid, arg.uuid),
        eq(projects.workspaceUuid, arg.workspaceUuid)
      )
    );
};

export const deleteProject = async (arg: ProjectSchema) => {
  return await db
    .delete(projects)
    .where(
      and(
        eq(projects.uuid, arg.uuid),
        eq(projects.workspaceUuid, arg.workspaceUuid)
      )
    );
};
