import {
    calculateComplexity,
    toUpperCaseWithCallback,
} from "../../app/doubles/otherUtils";

describe("OtherUtils test suite", () => {
    describe("toUpperCaseWithCallback test suite", () => {
        it("calls callback for invalid arg", () => {
            const actual = toUpperCaseWithCallback("", () => {});
            expect(actual).toBe("");
        });

        it("calls callback for valid arg", () => {
            const actual = toUpperCaseWithCallback("abc", () => {});
            expect(actual).toBe("ABC");
        });
    });

    it("calculates complexity - stub", () => {
        const someInfo = {
            length: 5,
            extraInfo: {
                field1: "someInfo",
                field2: "someInfo2",
            },
        };

        const actual = calculateComplexity(someInfo as any);
        expect(actual).toBe(10);
    });
});
