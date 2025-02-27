import { Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import styled from "styled-components";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import OauthServicesGroup from "./OauthServicesGroup";
import { RegisterUserInterface } from "../../schemas/auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import AuthService from "../../api/services/authService";


interface ComponentProps {
    handleError: (error: AxiosError) => void
}


export default function RegisterForm({ handleError }: ComponentProps) {
    const [form] = useForm<RegisterUserInterface>();
    const navigate = useNavigate();
    const authService = new AuthService();

    async function onFinish() {
        const userForm = await form.validateFields();
        await authService.checkUserExist(userForm, true).then(() => {
            navigate(
                "/verification", 
                {state: {redirected: true, userForm: userForm}}
            )
        }).catch(
            (error) => handleError(error)
        );
    }

    return (
        <FormContainer>
            <Typography.Title level={1}>Регистрация</Typography.Title>
            <StyledForm
                name="normal_login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="username"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите свой никнейм!",
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Username"  size="large"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите свою почту!",
                            type: "email",
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} type="email" placeholder="Почта" size="large"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите свой пароль!",
                        },
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" size="large" />
                </Form.Item>
                <OauthServicesGroup isRegisterForm={true}/>
            </StyledForm>
        </FormContainer>
    );
}

const StyledForm = styled(Form<RegisterUserInterface>)`
    width: 100%;
    margin-bottom: 10px;
`;


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 450px;
`;

