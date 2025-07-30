import type { ReactNode } from 'react';
import { styled } from 'styled-components';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography, Container } from '@mui/material';

const StyledContainer = styled(Container)`
    padding-top: 2rem;
    padding-bottom: 2rem;
`;

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            await logout();
            // ログアウト後にログインページにリダイレクト
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => isAuthenticated ? navigate('/todos') : navigate('/login') }
                    >
                        Todo App
                    </Typography>
                    { isAuthenticated ? (
                        <>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ): (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <StyledContainer maxWidth="lg">
                {children}
            </StyledContainer>
        </Box>
    );
}