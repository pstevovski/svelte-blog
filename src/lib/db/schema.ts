import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Users schema
export const schemaUser = sqliteTable('user', {
	id: integer('id').primaryKey(),
	first_name: text('first_name').notNull(),
	last_name: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	password: text("password").notNull(),
	created_at: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});
