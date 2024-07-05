<div class="p-6 mx-auto my-10 border border-slate-200 rounded bg-white max-w-[500px] w-full">
	<h3 class="text-left font-semibold text-slate-600 text-xl">Register</h3>
	<p class="text-left text-slate-400 text-sm mb-8">
		Create your new account
	</p>

	<form action="/auth?/login" class="flex flex-col">
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
		
    <div class="flex items-center justify-between">
      <span class="inline-block mb-10 text-xs text-slate-400">
        Already have account?
        <a href="/auth/login" class="underline hover:text-slate-700 duration-200">Sign In</a>
      </span>
    </div>

    <button class="w-full p-3 rounded bg-emerald-400 text-white hover:bg-emerald-500 duration-200">Sign Up</button>
	</form>
</div>
