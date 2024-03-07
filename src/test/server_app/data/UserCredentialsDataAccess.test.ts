import { DataBase } from "../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertFnMock = jest.fn();
const getByFnMock = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
    return {
        DataBase: jest.fn().mockImplementation(() => {
            return { insert: insertFnMock, getBy: getByFnMock };
        }),
    };
});

describe("UserCredentialsDataAccess test suite", () => {
    let sut: UserCredentialsDataAccess;

    const mockAccount: Account = {
        id: "",
        password: "pass",
        userName: "uname",
    };

    const mockId = "1234";

    beforeEach(() => {
        sut = new UserCredentialsDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should add user and return the id", async () => {
        insertFnMock.mockResolvedValueOnce(mockId);

        const actualId = await sut.addUser(mockAccount);

        expect(actualId).toBe(mockId);
        expect(insertFnMock).toHaveBeenCalledWith(mockAccount);
    });

    it("should get user by id", async () => {
        getByFnMock.mockResolvedValueOnce(mockAccount);

        const actual = await sut.getUserById(mockId);

        expect(actual).toEqual(mockAccount);
        expect(getByFnMock).toHaveBeenCalledWith("id", mockId);
    });

    it("should get user by name", async () => {
        getByFnMock.mockResolvedValueOnce(mockAccount);

        const actual = await sut.getUserByUserName(mockAccount.userName);

        expect(actual).toEqual(mockAccount);
        expect(getByFnMock).toHaveBeenCalledWith(
            "userName",
            mockAccount.userName
        );
    });
});
