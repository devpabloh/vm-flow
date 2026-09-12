export function TeamDashboard() {
  return (
    <div className="bg-background-secondary border border-border-default rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-4 pb-6 border-b border-border-default">
        <div className="w-16 h-16 rounded-full bg-action-primary flex items-center justify-center text-white text-xl font-bold">
          PH
        </div>
        <div>
          <h3 className="text-base font-semibold text-text-primary">Pablo Henrique</h3>
          <p className="text-xs text-text-secondary">Desenvolvedor Full-Stack • Time GSA</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-text-primary">Nome Completo</label>
          <input
            type="text"
            defaultValue="Pablo Henrique"
            disabled
            className="disabled:opacity-70 w-full px-3 py-2 text-xs bg-background-primary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-text-primary">E-mail Profissional</label>
          <input
            type="email"
            defaultValue="pablo@empresa.com"
            disabled
            className="disabled:opacity-70 w-full px-3 py-2 text-xs bg-background-primary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary"
          />
        </div>
      </div>
      {/* Painel da Equipe */}
      <div className="p-4 bg-background-primary rounded-xl border border-border-default space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-text-primary">
            Cota de Recursos da Equipe (GSA)
          </span>
          <span className="text-[11px] text-action-primary font-medium">82% Utilizado</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-action-primary w-[82%]" />
        </div>
        <div className="flex justify-between text-[11px] text-text-secondary">
          <span>32 de 40 vCPUs alocadas</span>
          <span>128 GB de 160 GB RAM</span>
        </div>
      </div>
    </div>
  );
}
