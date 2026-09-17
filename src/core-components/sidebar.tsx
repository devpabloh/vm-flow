import { LayoutDashboard, Server, Activity, FileText, Settings } from 'lucide-react';
import { NavLink } from 'react-router';
import LogoAtlas from '../assets/logo_atlas_atlas.svg?react';
import { useUser } from '../context/user-context';

export function Sidebar() {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="animate-pulse h-8 w-48 bg-slate-700/30 rounded" />;
  }

  const menuItems = [
    { label: 'Início', icon: LayoutDashboard, active: true, to: '/' },
    { label: 'Máquinas Virtuais', icon: Server, active: false, to: '/virtual-machines' },
    { label: 'Monitoramento', icon: Activity, active: false, to: '/monitoring' },
    { label: 'Relatórios', icon: FileText, active: false, to: '/reports' },
    { label: 'Configurações', icon: Settings, active: false, to: '/settings' }
  ];

  return (
    <aside className="w-56 bg-background-tertiary min-h-screen flex flex-col justify-between text-slate-300 border-r border-slate-500/50 select-none shrink-0 rounded-tr-xl rounded-br-xl">
      <div>
        <div className=" p-4  border-b border-white/5 flex items-center justify-center">
          {/* <img
            src={logoAtlas}
            alt="Logomarca Atlas"
            className="h-30
           w-auto"
          /> */}
          <LogoAtlas className="h-20 w-auto  text-white" />
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
                    : 'text-slate-400 hover:text-black dark:hover:text-white hover:bg-white/5'
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
            {user?.initials || '??'}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-black dark:text-white truncate">
              {user?.name}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-300">{user?.role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
