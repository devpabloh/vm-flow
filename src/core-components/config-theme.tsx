import { useTheme } from '../context/theme-context';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

const themeSettings = [
  { id: 'light', label: 'Claro', icon: Sun, desc: 'Fundo claro e alto contraste' },
  {
    id: 'dark',
    label: 'Escuro',
    icon: Moon,
    desc: 'Ideal para ambientes com pouca luz'
  },
  {
    id: 'system',
    label: 'Sistema',
    icon: Monitor,
    desc: 'Sincroniza com as opções do SO'
  }
];

export function ConfigTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="bg-background-secondary border border-border-default rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-text-primary">Tema da Interface</h2>
        <p className="text-xs text-text-secondary">
          Escolha como o VM Flow é exibido no seu navegador.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {themeSettings.map((item) => {
          const ItemIcon = item.icon;
          const isSelected = theme === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setTheme(item.id as any)}
              className={`flex flex-col gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-action-primary bg-action-primary/5 ring-2 ring-action-primary/20'
                  : 'border-border-default hover:border-slate-400 bg-background-primary/50'
              }`}
            >
              <div className="flex justify-between items-center">
                <ItemIcon
                  className={`w-5 h-5 ${isSelected ? 'text-action-primary' : 'text-text-secondary'}`}
                />
                {isSelected && <Check className="w-4 h-4 text-action-primary" />}
              </div>
              <div>
                <span className="text-sm font-semibold text-text-primary block">{item.label}</span>
                <span className="text-[11px] text-text-secondary">{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
