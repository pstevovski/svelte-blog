import { db } from '$lib/db/db.js';
import { schemaUser } from '$lib/db/schema.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { hash } from 'bcrypt';
import { z } from 'zod';

// Validation schemas
const userRegisterSchema = z
	.object({
		first_name: z.string().min(1, 'Please enter first name').trim(),
		last_name: z.string().min(1, 'Please enter last name').trim(),
		email: z.string().email('Please enter a valid email address').trim(),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(30, 'Password must not be longer than 30 characters'),
		confirm_password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(30, 'Password must not be longer than 30 characters')
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Passwords do not match',
		path: ['password']
	});

export const actions = {
	login: async function (event) {
		// todo: implement login
	},

	register: async function ({ request, cookies }) {
		const userData = await request.formData();

		const first_name = userData.get('first_name') as string;
		const last_name = userData.get('last_name') as string;
		const email = userData.get('email') as string;
		const password = userData.get('password') as string;

		const validationCheck = userRegisterSchema.safeParse(Object.fromEntries(userData));
		if (!validationCheck.success) {
			const errors: Record<string, string> = {};
			Object.values(validationCheck.error.errors).forEach((error) => {
				errors[error.path[0]] = error.message;
			});

			console.log('wat?');
			return fail(422, { errors });
		}

		// Check if a user with the provided email already exists in the database
		const existingUsers = await db
			.select()
			.from(schemaUser)
			.where(sql`lower(${schemaUser.email}) = ${email}`);

		if (existingUsers.length > 0) {
			return fail(400, { error: 'User already exists!' });
		}

		// Save the user in the database
		const hashedPassword: string = await hash(password, 10);
		await db.insert(schemaUser).values({ first_name, last_name, email, password: hashedPassword });

		// todo: set cookie
		cookies.set('authenticated', 'true', { path: '/' });

		redirect(303, '/');

		// todo: redirect to some page
	},

	logout: async function ({ cookies }) {
		cookies.delete('authenticated', { path: '/' });
		redirect(303, '/');
	}
};
