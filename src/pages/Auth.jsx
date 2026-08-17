import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth success
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md z-10 animate-scale-up">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-2xl hover:opacity-80 transition-opacity">
            C4C Portal
          </Link>
        </div>

        <div className="bg-base-100/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-base-content/10">
          <h2 className="text-3xl font-bold text-center text-base-content mb-2 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-center text-base-content/60 mb-8 text-sm">
            {isLogin ? 'Enter your credentials to access your account.' : 'Sign up to start collecting better feedback.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-base-content/80 mb-1.5">Email</label>
              <input 
                type="email" 
                required 
                className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/80 mb-1.5">Password</label>
              <input 
                type="password" 
                required 
                className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-full rounded-xl mt-2 text-base"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-base-content/60">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-semibold hover:underline transition-all"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-base-content transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
