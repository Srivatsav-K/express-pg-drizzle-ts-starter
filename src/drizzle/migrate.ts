import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const migrationClient = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
});

async function syncMigrationsWithDb() {
  try {
    const db = drizzle(migrationClient);

    console.log("⏳ Running migrations...");

    const start = Date.now();

    await migrate(db, {
      migrationsFolder: "./src/drizzle/migrations",
    });

    const end = Date.now();

    console.log(`✅ Migrations completed in ${end - start}ms`);
  } catch (e) {
    console.error("❌ Migration failed");
    console.error(e);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

syncMigrationsWithDb();
