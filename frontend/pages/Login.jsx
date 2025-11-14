import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up real auth call
    console.log("login", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-4xl mx-4 bg-black border border-gray-700 rounded-xl shadow-xl overflow-hidden flex">
        <div className="hidden md:flex w-1/2 items-center justify-center p-10 bg-gray-900/10">
          <div className="text-white">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-teal-400">
              newsflux
            </h1>
            <p className="mt-2 text-gray-300 font-semibold">
              A news-aggregator built with flask-backend
            </p>
            <p className="mt-4 text-gray-400 max-w-xs">
              Curated headlines, live updates, and personalized feeds all in one
              place.
            </p>
          </div>
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-8">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-white text-2xl font-semibold">Welcome back</h2>
            <p className="text-gray-400 mt-1">
              Sign in to continue to your feed
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="submit"
                className="bg-linear-to-r from-indigo-500 to-teal-400 text-white font-semibold px-5 py-2 rounded-md shadow-md"
              >
                Sign in
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Need help?{" "}
              <a className="text-indigo-400" href="#">
                Contact support
              </a>
            </p>

            <a
              href="/signup"
              className="text-sm text-gray-400 hover:text-white"
            >
              Don't have an account? Signup here.
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
