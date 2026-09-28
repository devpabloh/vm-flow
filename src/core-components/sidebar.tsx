import { useState } from 'react';
import { NavLink } from 'react-router';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import {
  LayoutDashboard,
  Server,
  Activity,
  FileText,
  Settings,
  ChevronRight,
  ChevronLeft,
  LogOut,
  type LucideIcon
} from 'lucide-react';
import { useRoles } from '../auth/use-roles';
import { ROLES, getRoleLabel } from '../auth/roles';
import LogoAtlas from '../assets/logo_atlas_atlas.svg?react';
import { useUser } from '../context/user-context';
import { ButtonIcon } from '../components/button-icon';

type MenuItem = {
  label: string;
  icon: LucideIcon;
  to: string;
  roles?: string[];
  requiresAuth?: boolean;
};

const menuItems: MenuItem[] = [
  { label: 'Início', icon: LayoutDashboard, to: '/' },
  { label: 'Máquinas Virtuais', icon: Server, to: '/virtual-machines', roles: [ROLES.admin], requiresAuth:true},
  { label: 'Monitoramento', icon: Activity, to: '/monitoring', roles: [ROLES.admin], requiresAuth: true },
  { label: 'Relatórios', icon: FileText, to: '/reports', roles: [ROLES.admin], requiresAuth: true },
  { label: 'Configurações', icon: Settings, to: '/settings', requiresAuth: true }
];

export function Sidebar() {
  const { user, loading } = useUser();
  const { instance } = useMsal();
  const { hasRole } = useRoles();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const isAuthenticated = useIsAuthenticated();

  const visibleItems = menuItems.filter((item)=> {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.roles && !hasRole(...item.roles)) return false;
    return true;
  });

  function toggleSidebar() {
    const next = !isCollapsed;
    localStorage.setItem('sidebar_collapsed', String(next));
    setIsCollapsed(next);
  }

  if (loading) {
    return <div className="animate-pulse h-8 w-48 bg-slate-700/30 rounded" />;
  }

  return (
    <aside
      className={`relative bg-background-tertiary min-h-screen flex flex-col justify-between text-slate-300 border-r border-slate-500/50 select-none shrink-0 rounded-tr-xl rounded-br-xl transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-18' : 'w-56'
      }`}
    >
      <button
        type="button"
        onClick={toggleSidebar}
        title={isCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
        className="absolute -right-3 top-7 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 bg-background-secondary text-text-primary shadow-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      <div>
        <div className="p-4 border-b border-white/5 flex items-center justify-center">
          <LogoAtlas
            className={`transition-all duration-300 text-white ${
              isCollapsed ? 'h-10 w-10' : 'h-16 w-auto'
            }`}
          />
        </div>

        <nav className="p-3 space-y-1">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-lg text-xs font-medium md:text-base transition-all ${
                  isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-action-primary text-white shadow-sm'
                    : 'text-slate-400 hover:text-black dark:hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className="w-4 h-4 md:w-6 md:h-6" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

     {user && (
       <div className="p-3 border-t border-white/5">
       <div
         className={`flex items-center rounded-lg bg-white/5 transition-all ${
           isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'
         }`}
       >
         {user.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            title={isCollapsed ? user.name : undefined}
            className='w-8 h-8 rounded-full object-cover shrink-0'
          />
         ): (
          <div
           className="w-8 h-8 rounded-full bg-action-primary flex items-center justify-center text-white font-medium text-xs shrink-0"
           title={isCollapsed ? user.name : undefined}
         >
           {user.initials}
         </div>
         )}

         {!isCollapsed && (
           <div className="flex items-center justify-between w-full truncate">
             <div className="flex flex-col w-full truncate">
               <span className="text-xs font-semibold text-white truncate ">
                 {user.name}
               </span>
               <span className="text-[10px] text-slate-400 truncate">
                 {getRoleLabel(user.role)}
               </span>
             </div>
             <ButtonIcon
               icon={LogOut}
               variant="none"
               onClick={() => instance.logoutRedirect()}
             />
           </div>
         )}
       </div>
     </div>
     )}
    </aside>
  );
}