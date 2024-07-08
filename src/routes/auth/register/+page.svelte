<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import FormInput from '$lib/components/Forms/FormInput.svelte';
	import Loader from '$lib/components/Loaders/Loader.svelte';

	let submitting = false;
	export let form;
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
			name="first_name"
			placeholder="John"
			label="First Name"
			error={form?.errors?.first_name}
		/>
		<FormInput
			name="last_name"
			placeholder="Doe"
			label="Last Name"
			error={form?.errors?.last_name}
		/>
		<FormInput
			name="email"
			placeholder="johndoe@example.com"
			label="Email"
			type="email"
			error={form?.errors?.email}
		/>
		<FormInput name="password" label="Password" type="password" error={form?.errors?.password} />
		<FormInput
			name="confirm_password"
			label="Confirm Password"
			type="password"
			error={form?.errors?.confirm_password}
		/>

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
				<Loader />
				Loading...
			{:else}
				Sign Up
			{/if}
		</button>
	</form>
</div>
