import { useState } from "react";
import LoginService from "./services/LoginService";
import LoginForm from "./ui/components/Login";

function App() {
    const loginService = new LoginService();
    const [token, setToken] = useState("");

    function handleSetToken(token: string) {
        setToken(token);
        console.log("set token ", token);
    }

    return (
        <div className="App">
            <LoginForm loginService={loginService} setToken={handleSetToken} />
        </div>
    );
}

export default App;
