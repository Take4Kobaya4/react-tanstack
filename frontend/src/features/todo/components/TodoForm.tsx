import { Alert, Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import type { Todo } from "../types/todo";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { todoSchema, type TodoFormData } from "../lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoApi } from "../apis/todo";

const StyledPaper = styled(Paper)`
    padding: 2rem;
    max-width: 600px;
    margin: 2rem auto;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const ButtonGroup = styled(Box)`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

interface TodoFormProps {
    todo?: Todo;
    isEdit?: boolean;
}

export const TodoForm = ({todo, isEdit}: TodoFormProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [error, setError] = useState<string>('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TodoFormData>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: todo?.title || "",
            description: todo?.description || "",
            completed: todo?.completed || false,
        },
    });

    const createMutation = useMutation({
        mutationFn: todoApi.createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            navigate('/todos');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            setError(error.response?.data?.message || "An error occurred while creating the todo.");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({id, data}: {id:number; data: TodoFormData}) => todoApi.updateTodo(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            queryClient.invalidateQueries({ queryKey: ['todo', todo?.id] });
            navigate('/todos');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            setError(error.response?.data?.message || "An error occurred while updating the todo.");
        },
    });

    const onSubmit = async (data: TodoFormData) => {
        if(isEdit && todo) {
            updateMutation.mutate({ id: todo.id, data });
        } else {
            createMutation.mutate(data);
        }
    }

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h4" component="h1" gutterBottom>
                {isEdit ? "Edit Todo" : "Create Todo"}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Title"
                    fullWidth
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />

                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    autoComplete="off"
                />

                {isEdit && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register('completed')}
                            />
                        }
                        label="Completed"
                        sx={{  mt: 2 }}
                    />
                )}

                <ButtonGroup>
                        <Button
                        type="button"
                        variant="outlined"
                        onClick={() => navigate(isEdit ? `/todos/${todo?.id}` : `/todos`) }
                        >
                            Cancel
                        </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </ButtonGroup>
            </StyledForm>
        </StyledPaper>
    );
}
