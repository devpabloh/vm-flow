// Nomes das app roles como estão cadastradas no App registration do Entra ID.
// Use sempre ROLES.xxx em vez de escrever a string, para o TypeScript pegar erros de digitação.
export const ROLES = {
  admin: 'admin_atlas',
  user: 'user_atlas'
} as const;

// Nome amigável de cada role, para exibir na tela
const ROLE_LABELS: Record<string, string> = {
  [ROLES.admin]: 'Administrador',
  [ROLES.user]: 'Usuário'
};

export function getRoleLabel(role: string) {
  return ROLE_LABELS[role] ?? role;
}
