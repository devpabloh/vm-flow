import { useMsal } from "@azure/msal-react"

export function useRoles(){
    const {instance, accounts} = useMsal();
    const account = instance.getActiveAccount() ?? accounts[0];
    const roles = (account?.idTokenClaims?.roles as string[] | undefined) ?? [];

    const hasRole = (...allowed: string[]) => roles.some((r)=> allowed.includes(r))

    return {roles, hasRole}
}