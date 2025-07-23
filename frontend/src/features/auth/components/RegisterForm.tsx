import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
export const RegisterForm = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async(data: RegisterFormData) => {
        try {
            setIsLoading(true);
            setError('');
            await registerUser(data.name, data.email, data.password);
            navigate('/todos');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Register User
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="name"
                    fullWidth
                    autoComplete="name"
                    autoFocus
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    label="email"
                    type="email"
                    fullWidth
                    autoComplete="email"
                    autoFocus
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    label="password"
                    type="password"
                    fullWidth
                    autoComplete="password"
                    autoFocus
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <TextField
                    label="confirm password"
                    type="password"
                    fullWidth
                    autoComplete="password_confirmation"
                    autoFocus
                    {...register('password_confirmation')}
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 2 }}
                >
                    {isLoading ? 'Loading...' : 'Register'}
                </Button>
            </StyledForm>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                    Already have an account?
                    <Button
                        variant="text"
                        onClick={() => navigate('/login')}
                        sx={{ textDecoration: 'underline' }}
                    >
                        Login
                    </Button>
                </Typography>
            </Box>
        </StyledPaper>
    );
}

export default RegisterForm;