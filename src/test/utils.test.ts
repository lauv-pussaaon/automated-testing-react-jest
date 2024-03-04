import { toUpperCase } from "../app/utils";

describe("utils test suite", () => {
    it("shouls return uppercase", () => {
        // arrange system
        const sut = toUpperCase;
        const expected = "ABC";

        // act
        const actual = sut("abc");

        // assert
        expect(actual).toBe("ABC");
    });
});
