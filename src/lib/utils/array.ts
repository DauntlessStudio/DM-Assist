import { getRandomInteger } from "./math";

/**
 * @remarks Attempts to remove a value from an array (modifies the array in place).
 * @param array The array to modify.
 * @param value The value to attempt to remove from the array.
 * @returns True if the value was removed, false otherwise.
 * @example
 * ```typescript
 * const array = ['apple', 'banana', 'cherry'];
 * removeFromArray(array, 'apple'); // Returns true, new value of array is: ['banana', 'cherry']
 * ```
 */
export function removeFromArray<T>(array: T[], value: T): boolean {
	const index = array.indexOf(value);
	if (index > -1) {
		array.splice(index, 1)
		return true;
	}

	return false;
}

/**
 * @remarks Attempts to add a unique value to an array (modifies the array in place).
 * @param array The array to modify.
 * @param value The value to add to the array if it doesn't contain it already.
 * @returns True if the value was added, false otherwise.
 * @example
 * ```typescript
 * const array = ['apple', 'banana', 'cherry'];
 * addUniqueToArray(array, 'apple'); // Returns false
 * addUniqueToArray(array, 'durian'); // Returns true, new value of array is: ['apple', 'banana', 'cherry', 'durian'];
 * ```
 */
export function addUniqueToArray<T>(array: T[], ...value: T[]): boolean {
	for (const val of value) {
		const index = array.indexOf(val);
		if (index <= -1) {
			array.push(val);
			return true;
		}
	}

	return false;
}

/**
 * @remarks Gets an array element at a random index.
 * @param array The array to get an entry from.
 * @returns A random entry in that array.
 * @example
 * ```typescript
 * const array = ['apple', 'banana', 'cherry'];
 * const randomFruit = getRandomArrayEntry(array); // Returns 'apple', 'banana', or 'cherry' randomly.
 * ```
 */
export function getRandomArrayEntry<T>(array: T[]): T {
	return array[getRandomInteger(0, array.length - 1)];
}