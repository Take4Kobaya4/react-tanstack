import { Paper, Typography, Alert, TextField, Button, Box, Link } from "@mui/material";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const StyledPaper = styled(Paper)`
    padding: 2rem;
    max-width: 400px;
    margin: 2rem auto;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async(data: LoginFormData) => {
        try {
            setIsLoading(true);
            setError('');
            await login(data.email, data.password);
            navigate('/todos');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    fullWidth
                    required
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                    fullWidth
                    required
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </StyledForm>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                    Don't you have an account?
                </Typography>
                <Link component={RouterLink} to="/register">
                    Register
                </Link>
            </Box>
        </StyledPaper>
    );
}

export default LoginForm;
