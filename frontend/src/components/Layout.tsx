import { Link, useLocation } from 'react-router-dom';
import { Droplets, Activity, Share2, Layers, Cpu, AlignLeft, Hash, BarChart2, BookOpen, GitBranch, Map } from 'lucide-react';
import clsx from 'clsx';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const links = [
    { to: '/', icon: Activity, label: 'Dashboard' },
    { to: '/demo', icon: BookOpen, label: 'Faculty Demo / DSA' },
    { to: '/strings', icon: AlignLeft, label: 'String Algorithms' },
    { to: '/suffix', icon: Layers, label: 'Suffix Structures' },
    { to: '/dp', icon: Hash, label: 'Dynamic Programming' },
    { to: '/network', icon: Share2, label: 'Network Flow' },
    { to: '/np', icon: GitBranch, label: 'NP-Completeness' },
    { to: '/random', icon: BarChart2, label: 'Randomized & Parallel' },
    { to: '/explorer', icon: BookOpen, label: 'Algorithm Explorer' },
    { to: '/architecture', icon: Cpu, label: 'Project Architecture' },
    { to: '/mapping', icon: Map, label: 'Project Mapping' },
  ];

  return (
    <div className="flex h-screen bg-darkblue text-slate-200">
      <aside className="w-64 bg-cardbg border-r border-slate-700 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <Droplets className="w-8 h-8 text-aqua" />
          <h1 className="text-xl font-bold text-white">AquaNet</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive ? "bg-aqua/10 text-aqua font-medium" : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
