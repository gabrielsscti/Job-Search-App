import getNextElement from "@/utils/getNextElement.js";

describe("nextElement", () => {
  it("locates element in list and returns the next element", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = getNextElement(list, value);
    expect(result).toBe("D");
  });
  it("locates element in the last element of the list and returns the first element", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "E";
    const result = getNextElement(list, value);
    expect(result).toBe("A");
  });
});
