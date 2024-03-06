import {
    calculateComplexity,
    toUpperCaseWithCallback,
} from "../../app/doubles/otherUtils";

describe("OtherUtils test suite", () => {
    describe.only("Tracking callbacks with Jest func mock", () => {
        const callBackMock = jest.fn();

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("calls callback for invalid argument - track calls", () => {
            const actual = toUpperCaseWithCallback("", callBackMock);
            expect(actual).toBeUndefined();
            expect(callBackMock).toHaveBeenCalledWith("Invalid argument!");
            expect(callBackMock).toHaveBeenCalledTimes(1);
        });
    });

    describe.only("Tracking callbacks", () => {
        let timesCalled = 0;

        function callBackMock(arg: string) {
            timesCalled++;
        }

        afterEach(() => {
            timesCalled = 0;
        });

        it("calls callback for invalid arg", () => {
            const actual = toUpperCaseWithCallback("", callBackMock);
            expect(actual).toBeUndefined();
            expect(timesCalled).toBe(1);
        });
    });

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
