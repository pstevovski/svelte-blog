<script lang="ts">
	export let data;
</script>

<div>
	<h1>SvelteKit Blog</h1>

	{#if data.isAuthenticated}
		<p>You're already logged in</p>
		<form method="POST" action="/auth?/logout">
			<button>Logout</button>
		</form>
	{:else}
		<a href="/auth/login" class="p-2 rounded bg-emerald-400 text-white">Login</a>
	{/if}
</div>
