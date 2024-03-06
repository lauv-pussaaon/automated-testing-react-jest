import { calculateComplexity } from "../../app/doubles/otherUtils";

describe("OtherUtils test suite", () => {
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
