export function isTypedArray(
	value: unknown,
): value is
	| Int8Array
	| Uint8Array
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array {
	return (
		value instanceof Int8Array ||
		value instanceof Uint8Array ||
		value instanceof Int16Array ||
		value instanceof Uint16Array ||
		value instanceof Int32Array ||
		value instanceof Uint32Array ||
		value instanceof Float32Array ||
		value instanceof Float64Array
	);
}
