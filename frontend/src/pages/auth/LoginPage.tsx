import styled from "styled-components";
import LoginForm from "../../components/auth/LoginForm";
import { AxiosError } from "axios";


interface ComponentProps {
    handleError: (error: AxiosError) => void
}


export default function LoginPage({ handleError }: ComponentProps) {
    return (
        <Container>
            <LoginForm handleError={handleError}/>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
`