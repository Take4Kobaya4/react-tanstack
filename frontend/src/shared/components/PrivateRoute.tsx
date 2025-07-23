import type { ReactNode } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";
import { Navigate } from "react-router-dom";



interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
    const { isLoading, isAuthenticated } = useAuth();


    if(isLoading){
        return (
            <LoadingSpinner message="Checking authentication..." />
        );
    }

    return !isAuthenticated ? <Navigate to="/login" /> : <>{children}</>
}
