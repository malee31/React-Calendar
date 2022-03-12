/**
 * Helper functions for managing localStorage and saving/getting events from it
 */

/**
 * Prefix used for all localStorage keys related to events
 * @type {string}
 */
const EVENT_KEY_PREFIX = "EVENT-DATA";

/**
 * Array holding EventData instances for a month. Note that the length of this array can be less than the number of days in the month as days without events are omitted
 * Not guaranteed to be sorted
 * @typedef {EventData[]} MonthEventData
 */

/**
 * Contains all the event data for a given day
 * Storage format is an object that uses the day of the month as the key
 * @typedef EventData
 * @property {number} day Day of the month (1-31)
 * @property {EventEntry[]} events Array of events for the given day
 */

/**
 * Object that contains the information about a single event
 * @typedef EventEntry
 * @property {string} title Label for an event
 * @property {string} [description=""] Description for an event
 * @property {string} start Date string for the start of an event
 * @property {string} end Date string for the end of an event
 */

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
 * Converts a month and year to a localStorage key
 * Warning: Does not validate
 * @param {number} month Month number from 1-12
 * @param {number} year Full year number
 * @return {string} String to use as a key for localStorage
 */
function toKey(month, year) {
	return `${EVENT_KEY_PREFIX}-${month}-${year}`;
}

/**
 * Fetches all events from a specified month
 * @param {number} month Month number from 1-12
 * @param {number} year Full year number
 * @throws {RangeError} Thrown when month is not between 1-12
 * @throws {RangeError} Thrown when year is not a number greater than or equal to 0
 * @return {MonthEventData} Returns an entire month's worth of events
 */
export function getMonthEvents(month, year) {
	rangeCheck(month, year);
	return JSON.parse(localStorage.getItem(toKey(month, year))) || {days: [], length: 0};
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
	localStorage.setItem(toKey(month,year), JSON.stringify(events));
}