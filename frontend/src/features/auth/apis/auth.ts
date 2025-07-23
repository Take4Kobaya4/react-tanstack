import apiClient from "../../../shared/apis/apiClient"
import type { ApiResponse } from "../../../shared/types/ApiResponse";
import type { LoginInput, RegisterInput, User } from "../types/auth";


export const authApi = {

    // ログイン
    async login(credentials: LoginInput): Promise<ApiResponse<User>> {
        const response = await apiClient.post('/login', credentials);
        return response.data;
    },

    // 会員登録
    async register(userData: RegisterInput): Promise<ApiResponse<User>> {
        const response = await apiClient.post('/register', userData);
        return response.data;
    },

    // ログアウト
    async logout(): Promise<void> {
        await apiClient.post('/logout');
    },

    // ユーザー情報の取得
    async getUser(): Promise<User> {
        const response = await apiClient.get('/user');
        return response.data;
    },
}