<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import FormInput from '$lib/components/Forms/FormInput.svelte';
	import Loader from '$lib/components/Loaders/Loader.svelte';

	export let form;
	let submitting: boolean = false;
</script>

<div class="p-6 mx-auto my-10 border border-slate-200 rounded bg-white max-w-[500px] w-full">
	<h3 class="text-left font-semibold text-slate-600 text-xl">Login</h3>
	<p class="text-left text-slate-400 text-sm mb-8">Use your existing account to login.</p>

	<form
		action="/auth?/login"
		method="POST"
		class="flex flex-col"
		use:enhance={() => {
			submitting = true;

			return async ({ update, result }) => {
				await update();
				submitting = false;

				// Updates the form properties for this page
				// with the results from the form submission in the
				// defined named form action
				await applyAction(result);
			};
		}}
	>
		<FormInput
			name="email"
			placeholder="john@doe.com"
			label="Email"
			type="email"
			error={form?.errors?.email}
		/>

		<FormInput name="password" label="Password" error={form?.errors?.password} />

		<div class="flex items-center justify-between">
			<a
				href="/auth/forgot-password"
				class="inline-block mb-10 text-xs text-slate-400 hover:text-slate-700 duration-200"
				>Forgot Password?</a
			>
			<a
				href="/auth/register"
				class="inline-block mb-10 text-xs text-slate-400 hover:text-slate-700 duration-200"
				>Sign Up</a
			>
		</div>

		<button
			class="w-full p-3 rounded bg-emerald-400 text-white hover:bg-emerald-500 duration-200"
			disabled={submitting}
		>
			{#if submitting}
				<Loader />
				Loading...
			{:else}
				Sign In
			{/if}
		</button>
	</form>
</div>
