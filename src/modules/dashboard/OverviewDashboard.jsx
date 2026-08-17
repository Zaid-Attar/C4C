import { BookOpen, HeartPulse, Shield, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OverviewDashboard() {
  const cards = [
    { title: 'Education', desc: 'School Kits, Digital Literacy', icon: BookOpen, path: '/education', color: 'text-primary bg-primary/10 border-primary/20' },
    { title: 'Health', desc: 'Camps, Blood Donation', icon: HeartPulse, path: '/health', color: 'text-error bg-error/10 border-error/20' },
    { title: 'Empowerment', desc: 'Women SHGs, Vocations', icon: Shield, path: '/empowerment', color: 'text-secondary bg-secondary/10 border-secondary/20' },
    { title: 'Environment', desc: 'Forestation, Recycling', icon: Leaf, path: '/environment', color: 'text-success bg-success/10 border-success/20' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 sm:p-12 text-primary-content shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 drop-shadow-sm">Seva Sahayog Impact Center</h1>
          <p className="text-lg opacity-90 mb-8 font-light">
            Welcome to the central command for all grassroots initiatives. 
            Track real-time progress across education, health, and empowerment drives.
          </p>
          <button className="btn btn-outline btn-primary-content border-white/40 hover:bg-white hover:text-primary rounded-full px-8">
            View Annual Report
          </button>
        </div>
        
        {/* Decorative backdrop inside hero */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full mix-blend-overlay pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-base-content mb-4 tracking-tight">Active Domains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <Link key={i} to={card.path} className="bg-base-100/90 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-base-content/10 hover:shadow-md hover:border-base-content/20 transition-all group flex flex-col h-full">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${card.color} group-hover:scale-110 transition-transform`}>
                <card.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-base-content mb-1">{card.title}</h3>
              <p className="text-sm font-medium text-base-content/50 mb-6 flex-1">{card.desc}</p>
              <div className="flex items-center text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
                Manage <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
