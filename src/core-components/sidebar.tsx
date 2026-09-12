import { LayoutDashboard, Server, Activity, FileText, Settings } from 'lucide-react';
import { NavLink } from 'react-router';

export function Sidebar() {
  const menuItems = [
    { label: 'Início', icon: LayoutDashboard, active: true, to: '/' },
    { label: 'Máquinas Virtuais', icon: Server, active: false, to: '/vms' },
    { label: 'Monitoramento', icon: Activity, active: false, to: '/monitoring' },
    { label: 'Relatórios', icon: FileText, active: false, to: '/reports' },
    { label: 'Configurações', icon: Settings, active: false, to: '/settings' }
  ];

  return (
    <aside className="w-56 bg-brand-sidebar min-h-screen flex flex-col justify-between text-slate-300 border-r border-slate-800 select-none shrink-0">
      <div>
        <div className="h-22 px-6 flex items-center gap-3 border-b border-white/5 font-bold text-white tracking-wide">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            A
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            T
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            L
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            A
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            S
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-action-primary text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
          <div className="w-8 h-8 rounded-full bg-action-primary flex items-center justify-center text-white font-medium text-xs">
            PH
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-white truncate">Pablo Henrique</span>
            <span className="text-[10px] text-slate-400">Administrador</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
