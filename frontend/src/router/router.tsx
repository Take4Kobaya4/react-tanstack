import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../shared/components/Layout";
import { PrivateRoute } from "../shared/components/PrivateRoute";
import TodoListPage from "../features/todo/components/TodoListPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import { TodoCreatePage } from "../features/todo/pages/TodoCreatePage";
import { TodoDetailPage } from "../features/todo/pages/TodoDetailPage";
import { TodoEditPage } from "../features/todo/pages/TodoEditPage";

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <Layout>
                <LoginPage />
            </Layout>
        )
    },
    {
        path: '/register',
        element: (
            <Layout>
                <RegisterPage />
            </Layout>
        ),
    },
    {
        path: '/todos',
        element: (
            <Layout>
                <PrivateRoute>
                    <TodoListPage />
                </PrivateRoute>
            </Layout>
        ),
    },
    {
        path: '/todos/create',
        element: (
            <PrivateRoute>
                <Layout>
                    <TodoCreatePage />
                </Layout>
            </PrivateRoute>
        ),
    },
    {
        path: '/todos/:id',
        element: (
            <PrivateRoute>
                <Layout>
                    <TodoDetailPage />
                </Layout>
            </PrivateRoute>
        )
    },
    {
        path: '/todos/:id/edit',
        element: (
            <PrivateRoute>
                <Layout>
                    <TodoEditPage />
                </Layout>
            </PrivateRoute>
        )
    },
]);

const AppRoutes = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default AppRoutes;