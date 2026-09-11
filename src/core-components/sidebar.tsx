import { LayoutDashboard, Server, Activity, FileText, Settings } from 'lucide-react';
import { NavLink } from 'react-router';

export function Sidebar(){
     const menuItems = [
    { label: 'Início', icon: LayoutDashboard, active: true, to: '/' },
    { label: 'Máquinas Virtuais', icon: Server, active: false, to: '/vms' },
    { label: 'Monitoramento', icon: Activity, active: false, to: '/monitoring' },
    { label: 'Relatórios', icon: FileText, active: false, to: '/reports' },
    { label: 'Configurações', icon: Settings, active: false, to: '/settings' },
 ]


return (
    <aside className='w-56 bg-brand-sidebar min-h-screen flex flex-col justify-between text-slate-300 border-r border-slate-800 select-none'>
        <div>
            <div className="h-16 px-6 flex items-center gap-3 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                    A
                </div>
                <span className="font-bold text-sm tracking-wide text-white">.</span>
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                    T
                </div>
                <span className="font-bold text-sm tracking-wide text-white">.</span>
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                    L
                </div>
                <span className="font-bold text-sm tracking-wide text-white">.</span>
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                    A
                </div>
                <span className="font-bold text-sm tracking-wide text-white">.</span>
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                    S
                </div>
            </div>
            <nav>
                {menuItems.map((item)=>(
                    <NavLink
                        key={item.label}
                        to={item.to}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                            item.active
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
        <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-xs">
            PH
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-white">Pablo Henrique</span>
            <span className="text-[10px] text-slate-400">Administrador</span>
          </div>
        </div>
      </div>
        
    </aside>
)
}