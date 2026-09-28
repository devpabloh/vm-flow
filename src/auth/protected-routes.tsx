import { Navigate, Outlet } from 'react-router';
import {useIsAuthenticated, useMsal} from '@azure/msal-react';
import {InteractionStatus} from '@azure/msal-browser';
import {Skeleton} from '../components/skeleton';

export function ProtectedRoutes(){
    const {inProgress} = useMsal();
    const isAuthenticated = useIsAuthenticated();
    
    if(inProgress !== InteractionStatus.None) return <Skeleton/>;

    return isAuthenticated? <Outlet/>: <Navigate to="/" replace/>;
    
    
}