<div class="p-6 mx-auto my-10 border border-slate-200 rounded bg-white max-w-[500px] w-full">
	<h3 class="text-left font-semibold text-slate-600 text-xl">Login</h3>
	<p class="text-left text-slate-400 text-sm mb-8">
		Use your existing account to login.
	</p>

	<form action="/auth?/login" class="flex flex-col">
    <label class="text-xs text-slate-700 mb-1"for="email">Email</label>
		<input
			type="text"
			placeholder="john@doe.com"
			required
			class="p-2 border border-slate-200 rounded focus:outline-none mb-6"
		/>

    <label class="text-xs text-slate-700 mb-1"for="password">Password</label>
		<input
			type="password"
			placeholder=""
			required
			class="p-2 border border-slate-200 rounded focus:outline-none mb-6"
		/>
		
    <div class="flex items-center justify-between">
      <a href="/auth/forgot-password" class="inline-block mb-10 text-xs text-slate-400 hover:text-slate-700 duration-200">Forgot Password?</a>
      <a href="/auth/register" class="inline-block mb-10 text-xs text-slate-400 hover:text-slate-700 duration-200">Sign Up</a>
    </div>

    <button class="w-full p-3 rounded bg-emerald-400 text-white hover:bg-emerald-500 duration-200">Login</button>
	</form>
</div>
