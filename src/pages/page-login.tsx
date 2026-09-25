import {useIsAuthenticated, useMsal} from '@azure/msal-react'
import {InteractionStatus} from '@azure/msal-browser'
import { loginRequest } from '../auth/msal.ts'
import { Navigate } from 'react-router'
import Atlas from "../assets/logo_atlas_atlas.svg?react"
import { Button } from "../components/button";
import { Text } from "../components/text";
import {LogIn} from 'lucide-react'
import { Skeleton } from '../components/skeleton.tsx';

export function PageLogin() {

    const {instance, inProgress} = useMsal();
    const isAuthenticated = useIsAuthenticated();

    if(inProgress !== InteractionStatus.None) return <Skeleton/>

    if(isAuthenticated) return <Navigate to="/home" replace/>

    return (
        <main className="flex flex-col h-screen w-full justify-center items-center">
            <div className="h-96 w-1/2 flex flex-col items-center justify-center  md:grid md:grid-cols-2 flex bg-slate-800 rounded-lg shadow-lg border border-slate-600">
                <div className="flex justify-center items-center border-r-2 border-slate-600">
                    <Atlas className="h-32"/>
                </div>
                <div className="flex flex-col items-center justify-center p-4 md:p-8">
                    <Text as="h2" variant="h2">Acesso ao sistema</Text>
                    <Text as="span" variant="explanation">Faça login para acessar o sistema A.T.L.A.S.</Text>
                    <Button icon={LogIn} className="mt-8 mx-auto" onClick={()=>instance.loginRedirect(loginRequest)}>Microsoft Entra ID</Button>
                </div>
            </div>
        </main>
    )
}