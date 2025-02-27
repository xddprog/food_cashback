import { useNavigate, useSearchParams } from "react-router-dom";
import AuthService from "../../api/services/authService";
import { Typography } from "antd";
import { BaseUserInterface } from "../../schemas/user";
import useUserAuthCallback from "../../hooks/useAuthCalback";

interface ComponentProps {
    setUser: React.Dispatch<React.SetStateAction<BaseUserInterface | null>>;
}

export default function AuthCallbackPage({ setUser }: ComponentProps): JSX.Element {
    const navigate = useNavigate();
    const [searchParam, ] = useSearchParams()
    const authService = new AuthService();

    useUserAuthCallback(searchParam, navigate, authService, setUser);

    return <Typography.Title>Авторизация...</Typography.Title>;
}
