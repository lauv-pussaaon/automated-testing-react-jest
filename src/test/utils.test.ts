import { getStringInfo, toUpperCase, StringUtils } from "../app/utils";

describe("utils test suite", () => {
    describe("StringUtils tests", () => {
        let sut: StringUtils;

        beforeEach(() => {
            sut = new StringUtils();
            console.log("Setup");
        });

        afterEach(() => {
            console.log("Teardown");
        });

        it("should return correct upperCase", () => {
            const actual = sut.toUpperCase("abc");
            expect(actual).toBe("ABC");
        });

        it("should throw error on invalid argument", () => {
            expect(() => {
                sut.toUpperCase("");
            }).toThrow("Invalid argument!");
        });

        it("should throw error on invalid argument inside try catch", (done) => {
            try {
                sut.toUpperCase("");
                done("GetStringInfo should throw error for invalid arg!");
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty("message", "Invalid argument!");
                done();
            }
        });
    });

    it("should return uppercase", () => {
        // arrange system
        const sut = toUpperCase;
        const expected = "ABC";

        // act
        const actual = sut("abc");

        // assert
        expect(actual).toBe("ABC");
    });

    describe("ToUpperCase examples", () => {
        it.each([
            { input: "abc", expected: "ABC" },
            { input: "My-String", expected: "MY-STRING" },
            { input: "def", expected: "DEF" },
        ])("$input toUpperCase should be $expected", ({ input, expected }) => {
            const actual = toUpperCase(input);
            expect(actual).toBe(expected);
        });
    });

    describe("getStringInfo for arg 'My-String' should", () => {
        test("return correct length", () => {
            const actual = getStringInfo("My-String");
            expect(actual.characters).toHaveLength(9);
        });
        test("return correct lower case", () => {
            const actual = getStringInfo("My-String");
            expect(actual.lowerCase).toBe("my-string");
        });
        test("return correct upper case", () => {
            const actual = getStringInfo("My-String");
            expect(actual.upperCase).toBe("MY-STRING");
        });
        test("return correct characters", () => {
            const actual = getStringInfo("My-String");
            expect(actual.characters).toEqual([
                "M",
                "y",
                "-",
                "S",
                "t",
                "r",
                "i",
                "n",
                "g",
            ]);
            expect(actual.characters).toContain<string>("M");
        });
        test("return defined extra info", () => {
            const actual = getStringInfo("My-String");
            expect(actual.extraInfo).toBeDefined();
        });
        test("return correct extraInfo object", () => {
            const actual = getStringInfo("My-String");
            expect(actual.extraInfo).toEqual({});
        });
    });
});
