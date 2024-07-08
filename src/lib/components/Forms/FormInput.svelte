<script>
	import cn from '$lib/utils/classnames';

	export let label;
	export let name;
	export let error = undefined;
	export let type = 'text';
	export let placeholder = '';
	export let modifierClass = '';
</script>

<label class="text-xs text-slate-700 mb-1" for={name}>{label}</label>
<input
	id={name}
	{name}
	{type}
	{placeholder}
	class={cn(
		'p-2 border border-slate-200 rounded focus:outline-none mb-6 placeholder:text-sm placeholder:text-slate-300 placeholder:font-light',
		error ? 'mb-1 border-red-500' : '',
		modifierClass
	)}
	autocomplete="new-password"
/>
{#if error}
	<p class="text-xs text-red-500 font-light mb-4">{error}</p>
{/if}
