import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { todoApi } from "../apis/todo";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { TodoForm } from "./TodoForm";


export const TodoEdit = () => {
    const { id } = useParams<{ id: string }>();
    const todoId = parseInt(id || '0');

    const { data, isLoading, error } = useQuery({
        queryKey: ['todo', todoId],
        queryFn: () => todoApi.getTodo(todoId),
        enabled: !!todoId,
    });

    if (isLoading) {
        return <LoadingSpinner message="Loading todo details..." />;
    }

    if (error) {
        return <ErrorMessage error={error as Error} />;
    }

    const todo = data;

    if(!todo) {
        return <ErrorMessage error={new Error("Todo not found")} />;
    }

    return <TodoForm isEdit/>
}

export default TodoEdit;
