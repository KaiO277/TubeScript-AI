import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  return (
    <main className="flex-grow flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl"
      >
        {/* Card Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Enter your credentials to access your account</p>
        </div>

        {/* Login Form */}
        <form action="#" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
              Email Address
            </label>
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" 
              id="email" 
              name="email" 
              placeholder="name@company.com" 
              required 
              type="email"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-300" htmlFor="password">
                Password
              </label>
              <a className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors" href="#">
                Forgot password?
              </a>
            </div>
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" 
              id="password" 
              name="password" 
              placeholder="••••••••" 
              required 
              type="password"
            />
          </div>

          {/* Sign In Button */}
          <button 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-[0.98]" 
            type="submit"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#0a0f18] text-slate-500 uppercase tracking-wider text-[10px] font-bold">
              or continue with
            </span>
          </div>
        </div>

        {/* Google Sign In */}
        <button 
          className="w-full flex items-center justify-center gap-3 bg-transparent border border-white/10 text-white font-medium py-3 px-4 rounded-xl hover:bg-white/5 transition-colors active:scale-[0.98]" 
          type="button"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          Sign in with Google
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? 
          <Link className="font-medium text-blue-500 hover:text-blue-400 transition-colors ml-1" to="/signup">
            Sign up for free
          </Link>
        </p>
      </motion.div>
    </main>
  );
};
