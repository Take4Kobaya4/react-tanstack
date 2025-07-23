import { Alert, AlertTitle } from "@mui/material";
import styled from "styled-components";


const StyledAlert = styled(Alert)`
    margin: 1rem 0;
`;

interface ErrorMessageProps {
    error: Error | string;
    title?: string;
}

export const ErrorMessage = (
    { error, title = "An error occurred" }: ErrorMessageProps
) => {
    const errorMessage = typeof error === 'string' ? error : error.message;

    return (
        <StyledAlert severity="error">
            <AlertTitle>{title}</AlertTitle>
            {errorMessage}
        </StyledAlert>
    );
}
