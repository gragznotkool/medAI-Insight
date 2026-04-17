import { Link } from 'react-router-dom';
import { Activity, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel !rounded-none !border-t-0 !border-x-0 !border-b-white/10 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-medical-cyan to-medical-purple">
          <Activity className="text-medical-cyan" />
          MedAI
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/dashboard" className="hover:text-medical-cyan transition-colors">Dashboard</Link>
          <Link to="/history" className="hover:text-medical-cyan transition-colors">History</Link>
        </nav>
      </div>
    </header>
  );
}
