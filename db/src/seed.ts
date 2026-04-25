import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from './db/schema'


async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seedUser(db)
}

async function seedUser(db: NodePgDatabase)
{
    await seed(db, { users: schema.users }).refine((f) => ({
        users: {
            columns: {
                name: f.fullName(),
                email: f.email(),
                password: f.string({
                    isUnique: false
                }),
                createdAt: f.default({ defaultValue: new Date() }),
                updatedAt: f.default({ defaultValue: new Date()}),
                deletedAt: f.default({ defaultValue: null }),
            },
            count: 20
        }
    }));
}

main();