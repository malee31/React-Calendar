import { configureStore } from '@reduxjs/toolkit';
import getMonthData from "./scripts/dateData";

/**
 * @typedef ReduxState
 * @property {FocusData} today The current date as a focus
 * @property {FocusData} focus The currently focused date. Initially the same as today
 * @property {string} zoom The zoom level of the calendar. Valid values are: MONTH, WEEK, DAY
 * @property {string} animationMode Determines which animations should be active. Valid values are: ZOOM, FLIP
 */

/**
 * @typedef FocusData
 * @property {MonthData} month Focused month data
 * @property {WeekData} week Focused week data
 * @property {DayData} day Focused day data
 * @property {string} string The focused date as a string outputted by Date.toString()
 */

const TODAY = new Date();
const CURRENT_FOCUS = extractFocus(TODAY);

/**
 * @type {ReduxState}
 */
const initialState = {
	today: CURRENT_FOCUS,
	focus: CURRENT_FOCUS,
	zoom: "MONTH",
	animationMode: "ZOOM"
};

/**
 * Creates a fresh focus object from a date. Only use when initializing or changing months
 * @param {Date} focusedDate Date object to focus on
 * @returns {FocusData} Contains the focus data extracted from focusedDate
 */
function extractFocus(focusedDate) {
	const focusedMonth = getMonthData(focusedDate.getFullYear(), focusedDate.getMonth(), false);
	return extractFocusFromData(focusedDate, focusedMonth);
}

/**
 * Arranges focused MonthData into a focus object given a Date object
 * @param {Date} focusedDate Date object to focus on
 * @param {MonthData} focusedMonth MonthData to convert into a focus object. Must be in the same month as focusedDate
 * @return {FocusData} Contains the focus data extracted from focusedDate
 */
function extractFocusFromData(focusedDate, focusedMonth) {
	const focusedWeek = focusedMonth.weeks.find(weekData => weekData.days.some(dayData => dayData?.day === focusedDate.getDate()));
	const focusedDay = focusedWeek.days.find(dayData => dayData?.day === focusedDate.getDate());
	return {
		month: focusedMonth,
		week: focusedWeek,
		day: focusedDay,
		string: focusedDate.toString()
	};
}

/**
 * Changes the day of the month focused onto. Reuses old focus data wrapped in a new object instance to assure referential equality
 * @param {FocusData} currentFocus The currently focused month
 * @param {number} day Day of the month to focus onto
 * @return {FocusData} Contains the focus data extracted from focusedDate
 */
function amendFocus(currentFocus, day) {
	const oldFocusDate = new Date(currentFocus.string);
	oldFocusDate.setDate(day);
	return extractFocusFromData(oldFocusDate, currentFocus.month);
}

/**
 * Root reducer for Redux actions
 * @param {Object} state Old state object
 * @param {Object} action Action object. Must contain a type property and whatever other properties are associated with that type
 * @return {Object} New state object. Must not have the same reference as the state param
 */
function rootReducer(state = initialState, action) {
	switch(action.type) {
		case "FOCUS":
			const newFocus = new Date(action.focusString);
			return {
				...state,
				focus: extractFocus(newFocus)
			};
		case "FOCUS_DAY":
			console.log(action)
			return {
				...state,
				focus: amendFocus(state.focus, action.day),
				animationMode: action.animationMode || "ZOOM"
			};
		case "ZOOM":
			return {
				...state,
				zoom: action.zoom,
				animationMode: action.animationMode || "ZOOM"
			};
		default:
			return state;
	}
}


/**
 * Short for readState. Shorthand for store.getState()
 * @return {ReduxState} Returns the entire state from store.getState() or the value stored in the state with the specified key
 */
export function rState() {
	return store.getState();
}

const store = configureStore({
	reducer: rootReducer,
	devTools: true
});

export const { month: CURRENT_MONTH, week: CURRENT_WEEK, day: CURRENT_DAY } = CURRENT_FOCUS;
export default store;