import { Button, Typography } from "antd";
import { BaseUserInterface } from "../../schemas/user";
import { useEffect, useState } from "react";
import AuthService from "../../api/services/authService";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


interface ComponentProps {
    user: BaseUserInterface | null,
}

export default function MainPage({user}: ComponentProps): JSX.Element {
    const [appUser, setAppUser] = useState<BaseUserInterface | null>(null)
    const authService = new AuthService();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setAppUser(user)
        } else {
            authService.getCurrentUser().then((res) => {
                setAppUser(res.data)
            }).catch(() => {
                navigate("/login")
            })
        }
    }, [])

    function logout() {
        authService.logoutUser().then(() => {
            navigate("/login")
        })
    }

    return (
        <Container>
            <Typography.Title level={2}>Добро пожаловать, {appUser?.username}</Typography.Title>
            <StyledButton type="primary" onClick={logout}>Выйти</StyledButton>
        </Container>
    );
}


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`

const StyledButton = styled(Button)`
    box-shadow: none;
    width: 200px;
    height: 40px;
`;
