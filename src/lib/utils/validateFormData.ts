import type { ZodSchema } from 'zod';

/**
 *
 * Utility function that validates the provided form data
 * after submitting an HTML form.
 *
 * @param schema The predefined Zod schema
 * @param data The form data object that was received
 *
 * @returns `undefined` or an object containing the errors.
 *
 */
async function validateFormData(
	schema: ZodSchema,
	data: FormData
): Promise<undefined | Record<string, string>> {
	const validationCheck = await schema.safeParseAsync(Object.fromEntries(data));

	if (validationCheck.success) return;

	const errors: Record<string, string> = {};
	Object.values(validationCheck.error.errors).forEach((error) => {
		errors[error.path[0]] = error.message;
	});

	return errors;
}

export default validateFormData;
