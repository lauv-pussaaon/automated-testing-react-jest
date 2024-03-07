import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type SomeTypeWithId = {
    id: string;
    name: string;
    color: string;
};

describe("Database test suite", () => {
    let sut: DataBase<SomeTypeWithId>;

    const fakeId = "1234";

    const mockObj1 = {
        id: "",
        name: "Lauv",
        color: "pink",
    };
    const mockObj2 = {
        id: "",
        name: "Dasie",
        color: "pink",
    };

    beforeEach(() => {
        sut = new DataBase<SomeTypeWithId>();
        jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
    });

    it("should return id after insert", async () => {
        const actual = await sut.insert({} as any);
        expect(actual).toBe(fakeId);
    });

    it("should get element after insert", async () => {
        const id = await sut.insert(mockObj1);
        const actual = await sut.getBy("id", id);
        expect(actual).toBe(mockObj1);
    });

    it("should find all elements with the same property", async () => {
        await sut.insert(mockObj1);
        await sut.insert(mockObj2);

        const expected = [mockObj1, mockObj2];

        const actual = await sut.findAllBy("color", "pink");

        expect(actual).toEqual(expected);
    });

    it("should update object color", async () => {
        const id = await sut.insert(mockObj1);
        const expectedColor = "red";

        await sut.update(id, "color", expectedColor);
        const object = await sut.getBy("id", id);
        const actualColor = object.color;

        expect(actualColor).toBe(expectedColor);
    });

    it("should delete object successfully", async () => {
        const id = await sut.insert(mockObj1);
        await sut.delete(id);

        const actual = await sut.getBy("id", id);
        expect(actual).toBeUndefined();
    });

    it("should get all elements", async () => {
        await sut.insert(mockObj1);
        await sut.insert(mockObj2);

        const expected = [mockObj1, mockObj2];

        const actual = await sut.getAllElements();

        expect(actual).toEqual(expected);
    });
});
