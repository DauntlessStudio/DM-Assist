/**
 * @remarks Gets a random number between min and max (inclusive).
 * @param min The minimum value (inclusive).
 * @param max The maximum value (inclusive).
 * @returns A random number between min and max.
 * @example
 * ```typescript
 * const value = getRandomInteger(0, 9); // Returns a random value beteen 0 and 9
 * ```
 */
export function getRandomInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}