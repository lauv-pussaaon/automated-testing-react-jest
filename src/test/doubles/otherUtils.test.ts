import {
    OtherStringUtils,
    calculateComplexity,
    toUpperCaseWithCallback,
} from "../../app/doubles/otherUtils";

describe.skip("OtherUtils test suite", () => {
    describe("OtherStringUtils class tests with spies", () => {
        let sut: OtherStringUtils;

        beforeEach(() => {
            sut = new OtherStringUtils();
        });

        test("Use a spy to track calls", () => {
            const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
            sut.toUpperCase("asdf");
            expect(toUpperCaseSpy).toHaveBeenCalledWith("asdf");
        });

        test("Use a spy to track calls to other module", () => {
            const consoleLogSpy = jest.spyOn(console, "log");
            sut.logString("asdf");
            expect(consoleLogSpy).toHaveBeenCalledWith("asdf");
        });

        test("Use a spy to replace the implementation of a method", () => {
            // example work around to call private function in an object class
            jest.spyOn(sut as any, "callExternalService").mockImplementation(
                () => {
                    console.log("overriden calling mocked implementation");
                }
            );

            (sut as any).callExternalService();
        });
    });

    describe("Tracking callbacks with Jest func mock", () => {
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

    describe("Tracking callbacks", () => {
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
