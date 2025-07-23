import { Box, CircularProgress, Typography } from "@mui/material";
import styled from "styled-components";


const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
`;

interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner = ({message = "Loading..."}: LoadingSpinnerProps) => {
    return (
        <LoadingContainer>
            <CircularProgress size={50} />
            <Typography variant="body1" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </LoadingContainer>
    );
}