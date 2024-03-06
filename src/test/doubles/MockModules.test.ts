jest.mock("../../app/doubles/OtherUtils", () => ({
    ...jest.requireActual("../../app/doubles/OtherUtils"),
    calculateComplexity: () => {
        return 10;
    },
}));

jest.mock("uuid", () => ({
    v4: () => "123",
}));

import * as utils from "../../app/doubles/otherUtils";

describe("module tests", () => {
    test("calculate complexity", () => {
        const result = utils.calculateComplexity({} as any);
        console.log(result);
    });

    test("keep other functions", () => {
        const result = utils.toUpperCase("abc");
        expect(result).toBe("ABC");
    });

    test("string with id", () => {
        const result = utils.toLowerCaseWithId("ABC");
        expect(result).toBe("abc123");
    });
});
