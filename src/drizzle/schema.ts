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

export const Users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: UserRole("role").default("BASIC").notNull(),
    createdAt: timestamp("created_at", {
      precision: 3,
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 3, // upto 3 ms
      withTimezone: true,
    })
      .$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`) // update the time when the row is modified
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return [index("email_index").on(table.email)];
  }
);

export const Notes = pgTable(
  "notes",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    isArchived: boolean("is_archived").default(false),
    tags: text("tags")
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`), // https://orm.drizzle.team/learn/guides/empty-array-default-value#postgresql
    userId: serial("user_id")
      .references(() => Users.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", {
      precision: 3,
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 3, // upto 3 ms
      withTimezone: true,
    })
      .$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`)
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return [index("user_index").on(table.userId)];
  }
);
