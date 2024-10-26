# sorted-stringify

A TypeScript utility library that provides functions for recursively sorting object keys and generating consistent JSON strings.

## Features

- 🔄 Recursively sort object keys in alphabetical order
- 📚 Handles nested objects and arrays
- 💪 Fully typed with TypeScript
- 🎯 Deterministic JSON stringification
- 🪶 Zero dependencies

## Installation

```bash
deno add jsr:@mofax/sorted-stringify
npx jsr add @mofax/sorted-stringify
```

## Usage

### `sortObject<T>(obj: T): T`

Recursively sorts the keys of an object or elements of an array.

```typescript
import { sortObject } from "@mofax/sorted-stringify";

const obj = {
	z: 1,
	a: { c: 3, b: 2 },
	array: [{ b: 2, a: 1 }, 3],
};

const sortedObj = sortObject(obj);
console.log(sortedObj);
// Output:
// {
//   a: { b: 2, c: 3 },
//   array: [{ a: 1, b: 2 }, 3],
//   z: 1
// }
```

### `stringify(value: unknown): string`

Sorts object keys recursively and returns a deterministic JSON string.

```typescript
import { stringify } from "@mofax/sorted-stringify";

const obj = {
	z: 1,
	a: { c: 3, b: 2 },
	array: [{ b: 2, a: 1 }, 3],
};

const jsonString = stringify(obj);
console.log(jsonString);
// Output:
// '{"a":{"b":2,"c":3},"array":[{"a":1,"b":2},3],"z":1}'
```

## API Reference

### `sortObject<T>(obj: T): T`

Recursively sorts the keys of an object or elements of an array.

- If the input is not an object or array, the value is returned as is
- If the input is an array, it recursively sorts each element in the array
- If the input is an object, it sorts the object by its keys and recursively sorts the values

#### Parameters

- `obj` - The input object, array, or any other value to be sorted

#### Returns

The sorted object, array, or the original value if it's not an object or array

### `stringify(value: unknown): string`

Sorts the keys of an object (or elements of an array) recursively and returns a JSON string.

#### Parameters

- `value` - The input value to be sorted and converted into a JSON string

#### Returns

The JSON string representation of the sorted input

#### Throws

- `Error` if the input value is `undefined`

## Use Cases

- Generating consistent hash keys from objects
- Creating reproducible test snapshots
- Ensuring consistent object serialization across different environments
- Comparing objects regardless of key order

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
