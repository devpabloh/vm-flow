import { useState } from 'react';
import { ConfigNotifications } from '../core-components/config-notifications';
import { DefaultsVirtualMachines } from '../core-components/defaults-virtual-machines';
import { KeysSsh } from '../core-components/keys-ssh';
import { TeamDashboard } from '../core-components/team-dashboard';
import { Palette, User, Key, Cpu, Bell, Check, Save } from 'lucide-react';
import { ConfigTheme } from '../core-components/config-theme';

type TabType = 'profile' | 'appearance' | 'ssh' | 'defaults' | 'notifications';

const menuTabs = [
  { id: 'appearance', label: 'Aparência & Tema', icon: Palette },
  { id: 'profile', label: 'Perfil & Equipe', icon: User },
  { id: 'ssh', label: 'Chaves SSH', icon: Key },
  { id: 'defaults', label: 'Padrões de VM', icon: Cpu },
  { id: 'notifications', label: 'Notificações', icon: Bell }
];

export function PageSettings() {
  const [activeTab, setActiveTab] = useState<TabType>('appearance');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.SubmitEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Cabeçalho da Página */}
      <div className="flex justify-between items-center border-b border-border-default pb-5">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Configurações do Sistema</h1>
          <p className="text-sm text-text-secondary">
            Gerencie suas preferências de usuário, preferências de infraestrutura da equipe e
            segurança.
          </p>
        </div>
        {savedSuccess && (
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-medium animate-fade-in">
            <Check className="w-4 h-4" /> Configurações salvas com sucesso!
          </div>
        )}
      </div>
      {/* Menu de Abas */}
      <div className="flex gap-2 border-b border-border-default overflow-x-auto">
        {menuTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'border-action-primary text-action-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
      {/* CONTEÚDO DAS ABAS */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: APARÊNCIA & TEMA */}
        {activeTab === 'appearance' && <ConfigTheme />}
        {/* TAB 2: PERFIL E EQUIPE */}
        {activeTab === 'profile' && <TeamDashboard />}
        {/* TAB 3: CHAVES SSH */}
        {activeTab === 'ssh' && <KeysSsh />}
        {/* TAB 4: PADRÕES DE VM */}
        {activeTab === 'defaults' && <DefaultsVirtualMachines />}
        {/* TAB 5: NOTIFICAÇÕES */}
        {activeTab === 'notifications' && <ConfigNotifications />}
        {/* Botão de Salvar Alterações */}
        <div className="flex justify-end pt-4 border-t border-border-default">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-action-primary text-white font-medium text-xs rounded-lg hover:bg-action-primary-hover transition-colors shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" /> Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}
