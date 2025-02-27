import styled from "styled-components";
import VerificationCodeForm from "../../components/auth/VerificationCodeForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BaseUserInterface } from "../../schemas/user";
import { RegisterUserInterface } from "../../schemas/auth";
import { AxiosError } from "axios";


interface ComponentProps {
    setUser: React.Dispatch<React.SetStateAction<BaseUserInterface | null>>,
    handleError: (error: AxiosError) => void
}

export default function VerificationPage({ setUser, handleError }: ComponentProps) {
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.state?.redirected) {
            navigate("/register")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container>
            <VerificationCodeForm 
                setUser={setUser}
                userForm={location.state?.userForm as RegisterUserInterface}
                handleError={handleError}
            />
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