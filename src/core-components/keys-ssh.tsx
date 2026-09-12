import { Plus, ShieldCheck, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function KeysSsh() {
  const [sshKeys, setSshKeys] = useState([
    {
      id: '1',
      name: 'MacBook Pro Dev',
      fingerprint: 'SHA256:x89aF...kL29Q',
      created: '2026-08-10'
    },
    {
      id: '2',
      name: 'Workstation CI/CD',
      fingerprint: 'SHA256:m01zP...vU88K',
      created: '2026-09-01'
    }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');

  const handleAddSshKey = () => {
    if (!newKeyName || !newKeyValue) return;
    setSshKeys((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newKeyName,
        fingerprint: `SHA256:${Math.random().toString(36).substring(2, 10)}...`,
        created: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewKeyName('');
    setNewKeyValue('');
  };
  const handleDeleteKey = (id: string) => {
    setSshKeys((prev) => prev.filter((k) => k.id !== id));
  };
  return (
    <div className="bg-background-secondary border border-border-default rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-text-primary">Chaves SSH de Acesso Directo</h2>
        <p className="text-xs text-text-secondary">
          Cadastre suas chaves públicas para conectar via terminal diretamente às VMs provisionadas.
        </p>
      </div>

      <div className="p-4 border-border-default rounded-xl bg-background-primary space-y-3">
        <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-action-primary" /> Adicionar Nova Chave SSH
        </span>
        <div className="grid grid-cols-1 md: grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Nome da chave (ex: Notebook Pessoal)"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="px-3 py-2 text-xs bg-background-secondary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary"
          />
          <input
            type="text"
            placeholder="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI..."
            value={newKeyValue}
            onChange={(e) => setNewKeyValue(e.target.value)}
            className="md:col-span-2 px-3 py-2 text-xs bg-background-secondary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary"
          />
        </div>
        <button
          type="button"
          onClick={handleAddSshKey}
          className="px-3 py-1.5 text-xs font-medium bg-action-primary text-white rounded-lg hover:bg-action-primary-hover transition-colors cursor-pointer"
        >
          Cadastrar chave
        </button>
      </div>
      <div className="space-y-2">
        {sshKeys.map((key) => (
          <div
            key={key.id}
            className="flex flex-items justify-between p-3 border border-border-default rounded-lg bg-background-primary/40 hover:border-action-primary/50 transition-colors group"
          >
            <div className="flex items-cebter gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <div>
                <span className="text-xs font-semibold text-text-primary block">{key.name}</span>
                <span className="text-[10px] text-text-secondary font-mono">{key.fingerprint}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDeleteKey(key.id)}
              className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
              title="Remover chave"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
