import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


interface ComponentProps {
    isRegisterForm: boolean
}


export default function OauthServicesGroup ({isRegisterForm}: ComponentProps): JSX.Element {
    const navigate = useNavigate();

    function authWithGithub() {
        window.location.assign(
            `${import.meta.env.VITE_GITHUB_OAUTH_URL}/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`
            + `&redirect_uri=${encodeURIComponent(import.meta.env.VITE_BASE_API_URL + '/auth/callback?service=github')}`
        );
    }
    
    function authWithVk() {
        window.location.assign(
            `${import.meta.env.VITE_VK_API_URL}?client_id=${import.meta.env.VITE_VK_APP_ID}`
            + `&display=popup`
            + `&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REDIRECT_URI + '/auth/callback')}`
            + `&response_type=code`
            + `&v=5.131`
        );
    }

    function authWithYandex() {
        window.location.assign(
            `${import.meta.env.VITE_YANDEX_API_URL}/authorize?response_type=token&client_id=${import.meta.env.VITE_YANDEX_CLIENT_ID}`);
    }

    return (
        <ButtonsContiner>
            <StyledButton type="primary" htmlType="submit">
                {!isRegisterForm ? "Войти": "Зарегистрироваться"}
            </StyledButton>
            <ButtonsGrid>
                <StyledButton onClick={authWithYandex}>
                    <StyledLinkButtonImage src="/public/social/yandex.png" />
                    {!isRegisterForm ? "Войти": "Регистрация"} c Yandex 
                </StyledButton>
                <StyledButton onClick={authWithVk}>
                    <StyledLinkButtonImage src="/public/social/vk.png" />
                    {!isRegisterForm ? "Войти": "Регистрация"} c VK 
                </StyledButton>
                <StyledButton onClick={authWithGithub}>
                    <StyledLinkButtonImage src="/public/social/github.png" />
                    {!isRegisterForm ? "Войти": "Регистрация"} c Github 
                </StyledButton>
                <StyledButton>
                    <StyledLinkButtonImage src="/public/social/telegram.png" />
                    {!isRegisterForm ? "Войти": "Регистрация"} c Telegram 
                </StyledButton>
            </ButtonsGrid>
            <LinksContainer>
                <LinksContinerItem>
                    <Typography.Paragraph style={{margin: 0}}>Забыли пароль?</Typography.Paragraph>
                    {isRegisterForm ? <a>Восстановить</a>: null}
                </LinksContinerItem>
                <LinksContinerItem>
                    <Typography.Paragraph>{!isRegisterForm ? "Нет аккаунта?": "Есть аккаунт?"}</Typography.Paragraph>
                    <a onClick={() => navigate(isRegisterForm ? "/login": "/register")}>
                        {isRegisterForm ? "Войти": "Зарегистрироваться"}
                    </a>
                </LinksContinerItem>
            </LinksContainer>
        </ButtonsContiner>
    )
}


const ButtonsContiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px
`;

const ButtonsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    width: 100%;
`;

const LinksContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;


const StyledButton = styled(Button)`
    box-shadow: none;
    width: 100%;
    height: 40px;
`;

const StyledLinkButtonImage = styled.img`
    width: 20px;
    height: 20px;
`;

const LinksContinerItem = styled.div`
    display: flex;
    gap: 5px;
`;