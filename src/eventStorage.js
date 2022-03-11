/**
 * Helper functions for managing localStorage and saving/getting events from it
 */
const EVENT_KEY_PREFIX = "EVENT-DATA";

/**
 * Checks the ranges of months and years and throws errors when out of range
 * @param {number} month Month number from 1-12
 * @param {number} year Full year number
 * @throws {RangeError} Thrown when month is not between 1-12
 * @throws {RangeError} Thrown when year is not a number greater than or equal to 0
 */
function rangeCheck(month, year) {
	if(month < 1 || month > 12) {
		throw new RangeError(`Month number must be between 1-12: ${month}`);
	}
	if(typeof year !== "number" || year < 0) {
		throw new RangeError(`Year must be a number greater than 0: ${year}`);
	}
}

/**
 * Fetches all events from a specified month
 * @param {number} month Month number from 1-12
 * @param {number} year Full year number
 * @throws {RangeError} Thrown when month is not between 1-12
 * @throws {RangeError} Thrown when year is not a number greater than or equal to 0
 * @return {Object} Returns an object where each day from 1-31 is an array of events or nonexistent
 */
export function getMonthEvents(month, year) {
	rangeCheck(month, year);
	const data = {};
	return data;
}

/**
 * Saves a month's events to localStorage
 * @param {number} month Month number from 1-12
 * @param {number} year Full year number
 * @param {Object} events Array of events to serialize into localStorage
 * @throws {RangeError} Thrown when month is not between 1-12
 * @throws {RangeError} Thrown when year is not a number greater than or equal to 0
 */
export function serialize(month, year, events) {
	rangeCheck(month, year);
}