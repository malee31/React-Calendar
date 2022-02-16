import { configureStore } from '@reduxjs/toolkit';
import getMonthData from "./scripts/dateData";

const TODAY = new Date();
const CURRENT_FOCUS = extractFocus(TODAY);
const { month: CURRENT_MONTH, week: CURRENT_WEEK, day: CURRENT_DAY } = CURRENT_FOCUS;

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
	const focusedWeek = focusedMonth.weeks.find(weekData => weekData.days.some(dayData => dayData?.day === focusedDate.getDate()));
	const focusedDay = focusedWeek.days.find(dayData => dayData?.day === focusedDate.getDate());
	return {
		month: focusedMonth,
		week: focusedWeek,
		day: focusedDay,
		string: focusedDate.toString()
	};
}

function rootReducer(state = initialState, action) {
	switch(action.type) {
		case "FOCUS":
			return {
				...state,
				focus: extractFocus(new Date(state.focus.string))
			};
		case "ZOOM":
			// TODO: Allow altering whether ["MONTH", "WEEK", "DAY"] are being zoomed in onto
			return {
				zoom: "MONTH",
				...state
			};
		default:
			return state;
	}
}

const store = configureStore({
	reducer: rootReducer,
	devTools: true
});

export default store;