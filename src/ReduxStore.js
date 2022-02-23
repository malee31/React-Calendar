import { configureStore } from '@reduxjs/toolkit';
import getMonthData from "./scripts/dateData";

const TODAY = new Date();
const CURRENT_FOCUS = extractFocus(TODAY);

const initialState = {
	today: CURRENT_FOCUS,
	focus: CURRENT_FOCUS,
	zoom: "MONTH"
};

/**
 * Obtains the full objects used to focus on
 * @param {Date} focusedDate Date object to focus on
 * @returns {Object} Contains focused MonthData, WeekData, and DayData
 */
function extractFocus(focusedDate) {
	const focusedMonth = getMonthData(focusedDate.getFullYear(), focusedDate.getMonth(), false);
	return extractFocusFromData(focusedDate, focusedMonth);
}

/**
 * Arranges focused MonthData into a focus object given a Date object
 * @param {Date} focusedDate Date object to focus on
 * @param {MonthData} focusedMonth MonthData to convert into a focus object. Must be in the same month as focusedDate
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
 * @param currentFocus
 * @param day
 */
function amendFocus(currentFocus, day) {
	const oldFocusDate = new Date(currentFocus.string);
	return extractFocusFromData(oldFocusDate, currentFocus.month);
}

function rootReducer(state = initialState, action) {
	switch(action.type) {
		case "FOCUS":
			const newFocus = new Date(state.focus.string);
			newFocus.setMonth(newFocus.getMonth() + action.offset);
			return {
				...state,
				focus: extractFocus(newFocus)
			};
		case "FOCUS_TO":
			return {
				...state,
				focus: amendFocus(state.focus, action.day)
			};
		case "ZOOM":
			// TODO: Allow altering whether ["MONTH", "WEEK", "DAY"] are being zoomed in onto
			return {
				...state,
				zoom: action.zoom
			};
		default:
			return state;
	}
}

const store = configureStore({
	reducer: rootReducer,
	devTools: true
});

export const { month: CURRENT_MONTH, week: CURRENT_WEEK, day: CURRENT_DAY } = CURRENT_FOCUS;
export default store;