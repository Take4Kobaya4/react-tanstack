import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';
export const RegisterPage = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if(isLoading) {
        return <LoadingSpinner message="Checking authentication status..." />;
    }

    if(isAuthenticated) {
        return <Navigate to="/todos" replace />;
    }

    return <RegisterForm />;
}

export default RegisterPage;

