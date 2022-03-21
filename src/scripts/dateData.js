import { getMonthEvents } from "./eventStorage";

/**
 * @typedef {Object} MonthData
 * @property {MonthData} [previous] MonthData of the previous month (without previous or next property)
 * @property {MonthData} [next] MonthData of the next month (without previous or next property)
 * @property {number} year Full year number
 * @property {number} month Month of the year (zero-indexed). Starts with 0 as January
 * @param {string} monthName Name of the month obtained from the Date object
 * @property {number} daysInMonth Number of days in specified month and year
 * @property {WeekData[]} weeks All the weeks in the month. See WeekData documentation for more format information
 */

/**
 * @typedef {Object} WeekData
 * @property {number} weekNumber Week number in month. Starts with 1 as the first week
 * @property {(DayData|null)[]} days All the days in the week from Sunday to Saturday. Days not part of the current month are null
 */

/**
 * @typedef {Object} DayData
 * @property {number} day Day of month. Starts with 1 as the first day
 * @property {number} dayNumber Day of week. Starts with 0 as Sunday
 * @property {number} dayOfWeek Day of the week. Starts with 0 as Sunday and ends with 6 as Saturday
 * @property {boolean} isWeekend Whether the day of the week is Sunday or Saturday. Made for convenience
 * @property {EventData} events All events on the given day
 */

/**
 * Returns information about a month and each day of the month using the Date object
 * @param {number} year Year to get month data from
 * @param {number} month Month to get month data from (Zero-indexed)
 * @param {boolean} [includeSurrounding = false] If set to true, the MonthData will also have its previous and next properties set
 * @returns {MonthData} Returns MonthData object with a previous and next field
 */
function getMonthData(year, month, includeSurrounding = false) {
	const events = getMonthEvents(month + 1, year);
	const dateProbe = new Date(year, month, 1);
	month = dateProbe.getMonth();
	year = dateProbe.getFullYear();
	/** @type MonthData */
	const monthData = {
		year: year,
		month: month,
		monthName: dateProbe.toLocaleString("default", { month: "long" }),
		daysInMonth: (new Date(year, month + 1, 0)).getDate(),
		weeks: []
	};

	for(let weekNum = 1; dateProbe.getDate() <= monthData.daysInMonth && dateProbe.getMonth() === month; weekNum++) {
		const dayData = new Array(7).fill(null);
		monthData.weeks.push({
			weekNumber: weekNum,
			days: dayData
		});

		do {
			const dayOfWeek = dateProbe.getDay();
			const dayOfMonth = dateProbe.getDate();
			dayData[dayOfWeek] = {
				day: dayOfMonth,
				dayNumber: dateProbe.getDay(),
				dayOfWeek: dayOfWeek,
				isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
				events: events.find(event => event.day === dayOfMonth) || []
				// isInMonth: probedMonth === month,
				// dateString: dateProbe.toISOString()
			};
			dateProbe.setDate(dayOfMonth + 1);
		} while(dateProbe.getDay() !== 0 && dateProbe.getMonth() === month);
	}

	if(includeSurrounding) {
		monthData.previous = getMonthData(year, month - 1);
		monthData.next = getMonthData(year, month + 1);
	}

	return monthData;
}

export default getMonthData;