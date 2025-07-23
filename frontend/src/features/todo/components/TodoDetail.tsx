import { Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { todoApi } from "../apis/todo";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";


const StyledCard = styled(Card)`
    margin-bottom: 2rem;
`;

const ActionBox = styled(Box)`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const ContentBox = styled(Box)`
    margin: 2rem 0;
`;

export const TodoDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const todoId = parseInt(id || '0');

    const { data, isLoading, error } = useQuery({
        queryKey: ['todo', todoId],
        queryFn: () => todoApi.getTodo(todoId),
        enabled: !!todoId,
    });

    const deleteMutation = useMutation({
        mutationFn: () => todoApi.deleteTodo(todoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            navigate('/todos');
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
        setDeleteDialogOpen(false);
    }

    if(isLoading) {
        return <LoadingSpinner message="Loading todo details..." />;
    }

    if(error) {
        return <ErrorMessage error={error as Error} />
    }

    const todo = data;

    if (!todo) {
        return <ErrorMessage error={new Error("Todo not found")} />;
    }

    return (
        <div>
            <ActionBox>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/todos')}
                >
                    Go Back to List
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => navigate(`/todos/${todoId}/edit`)}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                >
                    delete
                </Button>
            </ActionBox>

            <StyledCard>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h4" component="h1">
                            {todo.title}
                        </Typography>
                        <Chip
                            label={todo.completed ? "Completed" : "Pending"}
                            color={todo.completed ? "success" : "default"}
                        />
                    </Box>

                    <ContentBox>
                        <Typography variant="h6" gutterBottom>
                            Description
                        </Typography>
                        <Typography>
                            {todo.description}
                        </Typography>
                        
                    </ContentBox>
                </CardContent>
            </StyledCard>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Do you delete `{todo.title}`?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this todo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        color="inherit"
                        autoFocus
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TodoDetail;