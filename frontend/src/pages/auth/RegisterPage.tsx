import styled from "styled-components"
import RegisterForm from "../../components/auth/RegisterForm"
import { AxiosError } from "axios"


interface ComponentProps {
    handleError: (error: AxiosError) => void
}


export default function RegisterPage({ handleError }: ComponentProps) {
    return (
        <Container>
            <RegisterForm handleError={handleError}/>
        </Container>
    )
}
    

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
`
