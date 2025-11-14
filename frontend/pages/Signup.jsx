import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up signup call
    console.log("signup", { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-4xl mx-4 bg-black/60 border border-gray-700 rounded-xl shadow-xl overflow-hidden flex">
        {/* Left branding (hidden on small screens) */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-10 bg-gray-900/20">
          <div className="text-white">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-teal-400">
              newsflux
            </h1>
            <p className="mt-2 text-gray-300 font-semibold">
              A news-aggregator built with flask-backend
            </p>
            <p className="mt-4 text-gray-400 max-w-xs">
              Join to save topics, customize your feed, and get real time
              updates.
            </p>
          </div>
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-8">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-white text-2xl font-semibold">
              Create account
            </h2>
            <p className="text-gray-400 mt-1">
              Sign up to start exploring tailored news
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-gray-300">Full name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>

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
                  placeholder="Create a password"
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
                Create account
              </button>
            </div>

            <div className="text-sm text-gray-500 mt-4">
              By creating an account you agree to our{" "}
              <a className="text-indigo-400 block" href="#">
                Terms & Services.
              </a>
              <a
                href="/login"
                className="text-sm text-gray-400 hover:text-white"
              >
                Already have an account? Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
