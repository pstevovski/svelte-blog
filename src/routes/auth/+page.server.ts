import { db } from '$lib/db/db.js';
import { schemaUser } from '$lib/db/schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';
import { compare, hash } from 'bcrypt';
import { z } from 'zod';
import validateFormData from '$lib/utils/validateFormData.js';

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

const userLoginSchema = z.object({
	email: z.string().email('Please enter a valid email').trim(),
	password: z.string().min(6, 'Please enter your password')
});

export const actions = {
	login: async function ({ request, cookies }) {
		const userData = await request.formData();
		const email = userData.get('email') as string;
		const password = userData.get('password') as string;

		// Validate the provided form data
		const errors = await validateFormData(userLoginSchema, userData);
		if (errors) {
			return fail(422, { errors });
		}

		// Check if user exists and passwords match
		const users = await db.select().from(schemaUser).where(eq(schemaUser.email, email));
		if (!users.length) {
			return fail(400, { errors: 'Invalid username or password' });
		}

		// Compare the passwords
		const isPasswordMatching = await compare(password, users[0].password);
		if (!isPasswordMatching) {
			return fail(400, { errors: 'Invalid username or password' });
		}

		// If everything is fine, issue a cookie and redirect the user
		cookies.set('authenticated', 'true', { path: '/' });
		redirect(303, '/');
	},
	register: async function ({ request, cookies }) {
		const userData = await request.formData();

		const first_name = userData.get('first_name') as string;
		const last_name = userData.get('last_name') as string;
		const email = userData.get('email') as string;
		const password = userData.get('password') as string;

		// Validate the provided form data
		const errors = await validateFormData(userRegisterSchema, userData);
		if (errors) {
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

		// todo: clean this up
		cookies.set('authenticated', 'true', { path: '/' });
		redirect(303, '/');
	},

	logout: async function ({ cookies }) {
		cookies.delete('authenticated', { path: '/' });
		redirect(303, '/');
	}
};
