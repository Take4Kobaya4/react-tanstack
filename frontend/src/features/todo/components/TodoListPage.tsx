import { Box, Button, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { todoApi } from "../apis/todo";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";

const StyledCard = styled(Card)`
    margin-bottom: 1rem;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
    }
`;

const SearchBox = styled(Box)`
    margin-bottom: 2rem;
`;

const HeaderBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const TodoListPage = () => {
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ['todos'],
        queryFn: () => todoApi.getAllTodos(),
    });


    if (isLoading) {
        return <LoadingSpinner message="Checking authentication..." />;
    }

    if (error) {
        return <ErrorMessage error={error as Error} />
    }

    const todos = data || [];

    return (
        <div>
            <HeaderBox>
                <Typography variant="h4" component="h1">
                    Todo List
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/todos/create')}
                    color="primary"
                >
                    Create Todo
                </Button>
            </HeaderBox>

            <SearchBox>

            </SearchBox>

            {todos.length < 0 ? (
                <Typography variant="body1">No todos found.</Typography>
            ): (
                <>
                    <Grid container spacing={2}>
                        {todos.map((todo) => (
                            <StyledCard key={todo.id}
                                onClick={() => navigate(`/todos/${todo.id}`)}
                                sx={{ padding: 2 }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Typography variant="h6" component="h2">
                                            {todo.title}
                                        </Typography>
                                        <Chip
                                            label={todo.completed ? 'Completed' : 'Pending'}
                                            color={todo.completed ? 'success': 'default'}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="body2">
                                        {todo.description}
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
}

export default TodoListPage;
