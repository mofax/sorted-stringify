type AnyObject = { [key: string]: unknown };
/**
 * Recursively sorts the keys of an object or elements of an array.
 *
 * - If the input is not an object or array, the value is returned as is.
 * - If the input is an array, it recursively sorts each element in the array.
 * - If the input is an object, it sorts the object by its keys and recursively sorts the values.
 *
 * @param obj - The input object, array, or any other value to be sorted.
 * @returns The sorted object, array, or the original value if it's not an object or array.
 *
 * @example
 * ```typescript
 * const obj = {
 *   z: 1,
 *   a: { c: 3, b: 2 },
 *   array: [ { b: 2, a: 1 }, 3 ]
 * };
 * const sortedObj = sortObj(obj);
 * console.log(sortedObj);
 * // Output:
 * // {
 * //   a: { b: 2, c: 3 },
 * //   array: [ { a: 1, b: 2 }, 3 ],
 * //   z: 1
 * // }
 * ```
 */
export function sortObject<T>(obj: T): T {
  if (obj == null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObject) as T;
  }

  return Object.entries(obj)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .reduce((sortedObj: AnyObject, [key, value]) => {
      sortedObj[key] = sortObject(value);
      return sortedObj;
    }, {}) as T;
}

/**
 * Sorts the keys of an object (or elements of an array) recursively and returns a JSON string.
 *
 * - This function first sorts the object using `sortObject`, ensuring that the keys are ordered lexicographically.
 * - It then converts the sorted object (or array) into a JSON string.
 * - If the input is not an object or array, it is returned as a JSON string without modification.
 *
 * @param value - The input value to be sorted and converted into a JSON string. It can be an object, array, or any primitive value.
 * @returns The JSON string representation of the sorted input.
 *
 * @example
 * ```typescript
 * const obj = {
 *   z: 1,
 *   a: { c: 3, b: 2 },
 *   array: [ { b: 2, a: 1 }, 3 ]
 * };
 * const jsonString = stringify(obj);
 * console.log(jsonString);
 * // Output:
 * // '{"a":{"b":2,"c":3},"array":[{"a":1,"b":2},3],"z":1}'
 * ```
 */
export function stringify(value: unknown): string {
  if (value === undefined) throw new Error("Cannot stringify undefined");
  return JSON.stringify(sortObject(value));
}
