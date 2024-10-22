import { describe, expect, it } from "bun:test";
import { sortObject, stringify } from "./index";

describe("sortObject", () => {
  it("should return non-object values unchanged", () => {
    expect(sortObject(42)).toBe(42);
    expect(sortObject("string")).toBe("string");
    expect(sortObject(null)).toBe(null);
    expect(sortObject(undefined)).toBe(undefined);
    expect(sortObject(true)).toBe(true);
  });

  it("should sort the keys of an object", () => {
    const obj = { z: 1, a: 2, c: 3 };
    const sortedObj = sortObject(obj);
    expect(sortedObj).toEqual({ a: 2, c: 3, z: 1 });
  });

  it("should recursively sort nested objects", () => {
    const obj = {
      z: { d: 4, a: 1 },
      a: { b: 2, c: 3 },
    };
    const sortedObj = sortObject(obj);
    expect(sortedObj).toEqual({
      a: { b: 2, c: 3 },
      z: { a: 1, d: 4 },
    });
  });

  it("should handle arrays and sort nested objects within them", () => {
    const arr = [
      { z: 1, a: 2 },
      { b: 3, c: 4 },
    ];
    const sortedArr = sortObject(arr);
    expect(sortedArr).toEqual([
      { a: 2, z: 1 },
      { b: 3, c: 4 },
    ]);
  });

  it("should return an empty object if the input is an empty object", () => {
    const obj = {};
    const sortedObj = sortObject(obj);
    expect(sortedObj).toEqual({});
  });

  it("should return an empty array if the input is an empty array", () => {
    const arr: unknown[] = [];
    const sortedArr = sortObject(arr);
    expect(sortedArr).toEqual([]);
  });
});

describe("stringify", () => {
  it("should return the JSON string of a sorted object", () => {
    const obj = { z: 1, a: 2, c: 3 };
    const jsonString = stringify(obj);
    expect(jsonString).toBe('{"a":2,"c":3,"z":1}');
  });

  it("should return the JSON string of a recursively sorted object", () => {
    const obj = {
      z: { d: 4, a: 1 },
      a: { b: 2, c: 3 },
    };
    const jsonString = stringify(obj);
    expect(jsonString).toBe('{"a":{"b":2,"c":3},"z":{"a":1,"d":4}}');
  });

  it("should handle arrays and sort nested objects within them", () => {
    const arr = [
      { z: 1, a: 2 },
      { b: 3, c: 4 },
    ];
    const jsonString = stringify(arr);
    expect(jsonString).toBe('[{"a":2,"z":1},{"b":3,"c":4}]');
  });

  it("should return JSON string of non-object values", () => {
    expect(stringify(42)).toBe("42");
    expect(stringify("string")).toBe('"string"');
    expect(stringify(null)).toBe("null");
    expect(() => stringify(undefined)).toThrow("Cannot stringify undefined");
    expect(stringify(true)).toBe("true");
  });

  it("should return the JSON string of an empty object", () => {
    const obj = {};
    const jsonString = stringify(obj);
    expect(jsonString).toBe("{}");
  });

  it("should return the JSON string of an empty array", () => {
    const arr: unknown[] = [];
    const jsonString = stringify(arr);
    expect(jsonString).toBe("[]");
  });
});
