import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("user_role", ["ADMIN", "BASIC"]);

export const UsersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: UserRole("role").default("BASIC").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      precision: 3, // upto 3 ms
    }).$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`), // update the time when the row is modified
  },
  (table) => {
    return { emailIndex: index("email_index").on(table.email) };
  }
);

export const NotesTable = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "string",
    precision: 3, // upto 3 ms
  }).$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`), // update the time when the row is modified
  isArchived: boolean("is_archived").default(false),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`), // https://orm.drizzle.team/learn/guides/empty-array-default-value#postgresql
  userId: serial("user_id")
    .references(() => UsersTable.id, { onDelete: "cascade" })
    .notNull(),
});
