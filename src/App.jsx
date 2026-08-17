import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import SubmitFeedback from './pages/SubmitFeedback';
import EntriesList from './pages/EntriesList';
import AdminDashboard from './pages/AdminDashboard';
import { useStore } from './store/useStore';
import { Sparkles, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative gradient meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-secondary/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none animate-blob animation-delay-2000"></div>
      
      <div className="z-10 text-center max-w-3xl px-4 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 border border-base-300 text-sm font-medium mb-8 backdrop-blur-md text-base-content/80 shadow-sm">
          <Sparkles size={16} className="text-primary" />
          <span>Welcome to the new standard of feedback</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-base-content mb-6 drop-shadow-sm">
          Collect Feedback with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Absolute Clarity.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto font-light">
          A premium, high-performance platform for capturing community insights. 
          Seamlessly designed to adapt to your workflow.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/auth"
            className="btn btn-primary rounded-full px-8 py-3 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/entries"
            className="btn btn-ghost rounded-full px-8 py-3 text-base hover:bg-base-200 transition-all border border-base-300 shadow-sm"
          >
            Browse Entries
          </Link>
        </div>
      </div>
    </div>
  );
}

// wraps every page except Home/Auth with the shared Navbar
function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-200 text-base-content transition-colors duration-300">
      <Navbar />
      <main className="animate-fade-in relative z-0">
        {/* Subtle background glow for all pages */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-base-300/50 to-transparent pointer-events-none -z-10"></div>
        {children}
      </main>
    </div>
  );
}

function App() {
  const theme = useStore((state) => state.theme);

  // Apply theme to document on mount and when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/submit" element={<AppLayout><SubmitFeedback /></AppLayout>} />
        <Route path="/entries" element={<AppLayout><EntriesList /> </AppLayout>} />
        <Route path="/dashboard" element={<AppLayout><AdminDashboard /></AppLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;