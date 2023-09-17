import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const workspace = pgTable(
  "workspace",
  {
    uuid: text("uuid").notNull().primaryKey(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    name: text("name"),
    tenantId: text("tenant_id").notNull(),
  },
  (table) => {
    return {
      tenantIdx: uniqueIndex("tenant_idx").on(table.tenantId),
    };
  }
);

export const workspaceRelations = relations(workspace, ({ one, many }) => ({
  workspace: one(users, {
    fields: [workspace.tenantId],
    references: [users.id],
  }),
  todos: many(todos),
}));

export const statusEnum = pgEnum("status", ["todo", "done"]);

export const todos = pgTable("todos", {
  uuid: text("uuid").notNull().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  workspaceUuid: text("workspaceUuid").notNull(),
  content: text("content"),
  description: text("description"),
  status: statusEnum("status").default("todo"),
  dueDate: timestamp("due_date"),
});

export const todoRelations = relations(todos, ({ one }) => ({
  todo: one(workspace, {
    fields: [todos.workspaceUuid],
    references: [workspace.uuid],
  }),
}));

export const projects = pgTable("projects", {
  uuid: text("uuid").notNull().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  workspaceUuid: text("workspaceUuid").notNull(),
  name: text("name"),
});

export const projectRelations = relations(projects, ({ one }) => ({
  project: one(workspace, {
    fields: [projects.workspaceUuid],
    references: [workspace.uuid],
  }),
}));
