import { db } from '$lib/db/db.js';
import { schemaUser } from '$lib/db/schema.js';
import { error, fail } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { hash } from 'bcrypt';

export const actions = {
	login: async function (event) {
		// todo: implement login
	},

	register: async function ({ request }) {
		const userData = await request.formData();

		const first_name = userData.get('first_name') as string;
		const last_name = userData.get('last_name') as string;
		const email = userData.get('email') as string;
		const password = userData.get('password') as string;
		const confirm_password = userData.get('confirm_password') as string;

		// Check if a user with the provided email already exists in the database
		const existingUsers = await db
			.select()
			.from(schemaUser)
			.where(sql`lower(${schemaUser.email}) = ${email}`);

		if (existingUsers.length > 0) fail(400, { message: 'User already exists!' });

		// Check provided passwords
		if (password !== confirm_password) {
			// todo: fix this, error not working
			return fail(400, { error_password: 'wtf' });
		}

		// Save the user in the database
		const hashedPassword: string = await hash(password, 10);
		await db.insert(schemaUser).values({ first_name, last_name, email, password: hashedPassword });

		await new Promise((resolve) => {
			setTimeout(() => {
				resolve('yes');
			}, 5000);
		});

		// todo: redirect to some page
	}
};
