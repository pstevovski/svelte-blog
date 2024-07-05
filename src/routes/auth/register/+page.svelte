<script lang="ts">
	import { enhance } from '$app/forms';

	let submitting = false;
	export let form;

	$: {
		console.log('form', form);
	}
</script>

<div class="p-6 mx-auto my-10 border border-slate-200 rounded bg-white max-w-[500px] w-full">
	<h3 class="text-left font-semibold text-slate-600 text-xl">Register</h3>
	<p class="text-left text-slate-400 text-sm mb-8">Create your new account</p>

	<form
		action="/auth?/register"
		method="POST"
		class="flex flex-col"
		use:enhance={() => {
			submitting = true;

			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<label class="text-xs text-slate-700 mb-1" for="first_name">First Name</label>
		<input
			id="first_name"
			name="first_name"
			type="text"
			placeholder="John"
			required
			class="p-2 border border-slate-200 rounded focus:outline-none mb-6"
		/>

		<label class="text-xs text-slate-700 mb-1" for="last_name">Last Name</label>
		<input
			id="last_name"
			name="last_name"
			type="text"
			placeholder="john@doe.com"
			required
			class="p-2 border border-slate-200 rounded focus:outline-none mb-6"
		/>

		<label class="text-xs text-slate-700 mb-1" for="email">Email</label>
		<input
			id="email"
			name="email"
			type="text"
			placeholder="john@doe.com"
			required
			class="p-2 border border-slate-200 rounded focus:outline-none mb-6"
		/>

		<label class="text-xs text-slate-700 mb-1" for="password">Password</label>
		<input
			id="password"
			name="password"
			type="password"
			required
			class="p-2 border border-slate-200 rounded focus:outline-none mb-6"
		/>

		<label class="text-xs text-slate-700 mb-1" for="confirm_password">Confirm Password</label>
		<input
			id="confirm_password"
			name="confirm_password"
			type="password"
			required
			class="p-2 border border-slate-200 rounded focus:outline-none mb-8"
		/>
		{#if form?.errors?.password}
			<span class="text-sm text-red-600">abc</span>
		{/if}

		<div class="flex items-center justify-between">
			<span class="inline-block mb-10 text-xs text-slate-400">
				Already have account?
				<a href="/auth/login" class="underline hover:text-slate-700 duration-200">Sign In</a>
			</span>
		</div>

		<button
			class="w-full p-3 rounded bg-emerald-400 text-white hover:bg-emerald-500 duration-200 flex items-center justify-center disabled:bg-slate-200"
			disabled={submitting}
		>
			{#if submitting}
				<svg
					aria-hidden="true"
					role="status"
					class="inline w-4 h-4 text-white mr-3 animate-spin"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="#E5E7EB"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentColor"
					/>
				</svg>
				Loading...
			{:else}
				Sign Up
			{/if}
		</button>
	</form>
</div>
