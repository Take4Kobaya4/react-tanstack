import apiClient from "../../../shared/apis/apiClient";
import type { ApiResponse } from "../../../shared/types/ApiResponse";
import type { Todo, TodoCreateInput, TodoUpdateInput } from "../types/todo";


export const todoApi = {
    // Todo一覧を取得
    async getAllTodos (search?: string): Promise<ApiResponse<Todo[]>> {
        const params = search ? { search } : {};
        const response = await apiClient.get(`/todos?${search}`, { params });
        return response.data;
    },

    // Todo詳細を取得
    async getTodo (id: number): Promise<ApiResponse<Todo>> {
        const response = await apiClient.get(`/todos/${id}`);
        return response.data;
    },

    // Todoを作成
    async createTodo (todo: TodoCreateInput): Promise<ApiResponse<Todo>> {
        const response = await apiClient.post('/todos', todo);
        return response.data;
    },

    // Todoを更新
    async updateTodo (id: number, todo: TodoUpdateInput): Promise<ApiResponse<Todo>> {
        const response = await apiClient.put(`/todos/${id}`, todo);
        return response.data;
    },

    // Todoを削除
    async deleteTodo(id: number): Promise<void> {
        await apiClient.delete(`/todos/${id}`);
    },
}