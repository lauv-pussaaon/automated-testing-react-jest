import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { IncomingMessage, ServerResponse } from "http";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import {
    HTTP_CODES,
    HTTP_METHODS,
} from "../../../app/server_app/model/ServerModel";
import { Account } from "../../../app/server_app/model/AuthModel";

const getRequestBodyMock = jest.fn();

jest.mock("../../../app/server_app/utils/Utils", () => ({
    getRequestBody: () => getRequestBodyMock(),
}));

describe.only("RegisterHandler test suite", () => {
    let sut: RegisterHandler;

    const requestMock = {
        method: undefined,
    };

    const responseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn(),
    };
    const authorizeMock = {
        registerUser: jest.fn(),
    };

    const mockAccount: Account = {
        id: "",
        password: "somePassword",
        userName: "someUserName",
    };

    const mockId = "1234";

    beforeEach(() => {
        sut = new RegisterHandler(
            requestMock as IncomingMessage,
            responseMock as any as ServerResponse,
            authorizeMock as any as Authorizer
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should register valid accounts in requests", async () => {
        requestMock.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce(mockAccount);
        authorizeMock.registerUser.mockResolvedValueOnce(mockId);

        await sut.handleRequest();

        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.CREATED,
            { "Content-Type": "application/json" }
        );
        expect(responseMock.write).toHaveBeenCalledWith(
            JSON.stringify({ userId: mockId })
        );
    });

    it("should not register valid accounts in requests", async () => {
        requestMock.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce({});

        await sut.handleRequest();

        expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.BAD_REQUEST,
            { "Content-Type": "application/json" }
        );
        expect(responseMock.write).toHaveBeenCalledWith(
            JSON.stringify("userName and password are required")
        );
    });

    it("should do nothing for not supported http methods", async () => {
        requestMock.method = HTTP_METHODS.GET;
        await sut.handleRequest();

        expect(responseMock.writeHead).not.toHaveBeenCalled();
        expect(responseMock.write).not.toHaveBeenCalled();
        expect(getRequestBodyMock).not.toHaveBeenCalled();
    });
});
