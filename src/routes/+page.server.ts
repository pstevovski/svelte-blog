export function load({ cookies }) {
	// todo: this will be updated
	const isAuthenticated = cookies.get('authenticated');

	return { isAuthenticated };
}
