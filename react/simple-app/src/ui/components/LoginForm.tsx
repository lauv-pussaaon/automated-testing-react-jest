import { SyntheticEvent, useState } from "react";
import LoginService from "../../services/LoginService";

type LoginProps = {
    loginService: LoginService;
    setToken: (token: string) => void;
};

function LoginForm({ loginService, setToken }: LoginProps) {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginResult, setLoginResult] = useState<string>("");

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (userName && password) {
            const loginResponse = await loginService.login(userName, password);
            if (loginResponse) {
                setLoginResult("successful login");
                setToken(loginResponse);
            } else {
                setLoginResult("invalid credentials");
            }
        } else {
            setLoginResult("UserName and password required!");
        }
    };

    function renderLoginResult() {
        if (loginResult) {
            return <label data-testid="resultLabel">{loginResult}</label>;
        }
    }

    return (
        <div role="main" data-testid="login-form">
            <h2>Please login</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>User name</label>
                <input
                    data-testid="input-username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <br />
                <label>Password</label>
                <input
                    data-testid="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <br />
                <input data-testid="input-submit" type="submit" value="Login" />
            </form>
            <br />
            {renderLoginResult()}
        </div>
    );
}

export default LoginForm;
