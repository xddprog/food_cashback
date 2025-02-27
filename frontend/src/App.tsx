import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import MainPage from "./pages/main/MainPage"
import { ConfigProvider, message } from "antd"
import { appTheme } from "./utils/themeSettings"
import { useState } from "react"
import { BaseUserInterface } from "./schemas/user"
import AuthCallbackPage from "./pages/auth/AuthCallbackPage"
import VerificationPage from "./pages/auth/VerificationPage"
import { AxiosError } from "axios"

function App() {
    const [user, setUser] = useState<BaseUserInterface | null>(null)
    const [messageApi, contextHolder] = message.useMessage();

    function handleError(error: AxiosError) {
        if (error.response) {
            messageApi.error(
                error.response.data?.detail
            )
        } else {
            messageApi.error(
                error.message
            )
        }
        
    }

    return (
        <ConfigProvider theme={appTheme}>
            {contextHolder}
            <BrowserRouter>
                <Routes> 
                    <Route path="/" element={<MainPage user={user}/>} />
                    <Route path="/login" element={<LoginPage handleError={handleError} />} />
                    <Route path="/register" element={<RegisterPage handleError={handleError} />} />
                    <Route
                        path="/auth/callback"
                        element={<AuthCallbackPage setUser={setUser} />}
                    />
                    <Route 
                        path="verification" 
                        element={<VerificationPage setUser={setUser} handleError={handleError} /> }
                    />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App