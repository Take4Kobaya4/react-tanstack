import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';

export const LoginPage = () => {
    const { isAuthenticated, isLoading, user } = useAuth();

    if(isLoading) {
        return <LoadingSpinner message="Checking authentication status..." />;
    }

    if(isAuthenticated && user) {
        return <Navigate to="/todos" />;
    }

    return <LoginForm />;
}

export default LoginPage;