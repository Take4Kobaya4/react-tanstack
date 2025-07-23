export interface ApiResponse<T> {
    title: ReactNode;
    description: ReactNode;
    completed: any;
    data: T;
    message?: string;
}