import {
  InteractionRequiredAuthError,
  type AccountInfo,
  type IPublicClientApplication
} from '@azure/msal-browser';
import { loginRequest } from './msal';

const GRAPH_URL = 'https://graph.microsoft.com/v1.0';

export interface GraphUser {
  id: string;
  displayName?: string;
  givenName?: string;
  surname?: string;
  mail?: string;
  userPrincipalName?: string;
  jobTitle?: string;
  department?: string;
  officeLocation?: string;
  mobilePhone?: string;
  businessPhones?: string[];
}

async function getToken(instance: IPublicClientApplication, account: AccountInfo) {
  try {
    const result = await instance.acquireTokenSilent({ ...loginRequest, account });
    return result.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      await instance.acquireTokenRedirect({ ...loginRequest, account });
    }
    throw error;
  }
}

// Dados do perfil do usuário logado
export async function getMe(instance: IPublicClientApplication, account: AccountInfo) {
  const token = await getToken(instance, account);
  const fields = [
    'id',
    'displayName',
    'givenName',
    'surname',
    'mail',
    'userPrincipalName',
    'jobTitle',
    'department',
    'officeLocation',
    'mobilePhone',
    'businessPhones'
  ].join(',');

  const response = await fetch(`${GRAPH_URL}/me?$select=${fields}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error(`Graph /me falhou: ${response.status}`);

  return (await response.json()) as GraphUser;
}

// Foto do usuário como URL (blob). Retorna null se o usuário não tiver foto (404).
export async function getMyPhoto(instance: IPublicClientApplication, account: AccountInfo) {
  const token = await getToken(instance, account);

  const response = await fetch(`${GRAPH_URL}/me/photo/$value`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) return null;

  return URL.createObjectURL(await response.blob());
}
