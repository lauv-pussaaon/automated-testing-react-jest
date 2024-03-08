import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm tests suite", () => {
    const loginServiceMock = {
        login: jest.fn(),
    };

    const setTokenMock = jest.fn();

    function setup() {
        render(
            <LoginForm
                loginService={loginServiceMock}
                setToken={setTokenMock}
            />
        );
    }

    beforeEach(() => setup());
    afterAll(() => {
        jest.clearAllMocks();
    });

    it("should render correctly the login component", () => {
        const mainElement = screen.getByTestId("login-form");
        expect(mainElement).toBeInTheDocument();
    });

    it("should render form elements correctly", () => {
        const inputUsername = screen.getByTestId("input-username");
        const inputPassword = screen.getByTestId("input-password");
        const inputSubmit = screen.getByTestId("input-submit");

        expect(inputUsername.getAttribute("value")).toBe("");
        expect(inputPassword.getAttribute("value")).toBe("");
        expect(inputSubmit.getAttribute("value")).toBe("Login");
    });

    it("show required message when logging in with incomplete credentials", () => {
        const inputSubmit = screen.getByTestId("input-submit");
        fireEvent.click(inputSubmit);

        const resultLabel = screen.getByTestId("resultLabel");
        expect(resultLabel.textContent).toBe("UserName and password required!");
    });

    it("login successfully when logggin in with correct credentials", async () => {
        loginServiceMock.login.mockResolvedValueOnce("1111");
        const inputUsername = screen.getByTestId("input-username");
        const inputPassword = screen.getByTestId("input-password");
        const inputSubmit = screen.getByTestId("input-submit");

        fireEvent.change(inputUsername, { target: { value: "some_user" } });
        fireEvent.change(inputPassword, { target: { value: "some_pwd" } });
        fireEvent.click(inputSubmit);

        expect(loginServiceMock.login).toBeCalledWith("some_user", "some_pwd");

        const resultLabel = await screen.findByTestId("resultLabel");
        expect(resultLabel.textContent).toBe("successful login");
    });

    it("login fails when logggin in with incorrect credentials", async () => {
        loginServiceMock.login.mockResolvedValueOnce(undefined);
        const inputUsername = screen.getByTestId("input-username");
        const inputPassword = screen.getByTestId("input-password");
        const inputSubmit = screen.getByTestId("input-submit");

        fireEvent.change(inputUsername, { target: { value: "some_user" } });
        fireEvent.change(inputPassword, { target: { value: "some_pwd" } });
        fireEvent.click(inputSubmit);

        expect(loginServiceMock.login).toBeCalledWith("some_user", "some_pwd");

        const resultLabel = await screen.findByTestId("resultLabel");
        expect(resultLabel.textContent).toBe("invalid credentials");
    });
});
