import store, {rState} from "./ReduxStore";

/**
 * Changes the zoom level of the calendar
 * @param {string} level What level to zoom to. Must be DAY, WEEK, or MONTH
 */
function Zoom(level) {
	store.dispatch({
		type: "ZOOM",
		zoom: level
	});
}

/**
 * Changes the focus based on an offset object. Attempts to reuse month data where possible to preserve referential equality
 * @param {Object} [baseOffset] Contains the number of years, months, weeks, and days to offset by
 */
function Focus(baseOffset) {
	const offset = {
		year: 0,
		month: 0,
		week: 0,
		day: 0,
		...baseOffset
	};
	const oldFocus = rState().focus;
	const newFocus = new Date(oldFocus.string);
	newFocus.setFullYear(oldFocus.month.year + offset.year);
	newFocus.setMonth(oldFocus.month.month + offset.month);
	newFocus.setDate(oldFocus.day.day + (offset.week * 7 + offset.day));

	if(oldFocus.month.year === newFocus.getFullYear() && oldFocus.month.month === newFocus.getMonth()) {
		FocusDay(newFocus.getDate());
	} else {
		store.dispatch({
			type: "FOCUS",
			focusString: newFocus.toString()
		});
	}
}

/**
 * Switch focus to a different day in the current month
 * @param {number} dayNum Day in month to change focus to
 */
function FocusDay(dayNum) {
	store.dispatch({
		type: "FOCUS_DAY",
		day: dayNum
	});
}

const Dispatcher = {
	Zoom,
	Focus,
	FocusDay
};
export default Dispatcher;