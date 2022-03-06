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
 * @constructor
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
		store.dispatch({
			type: "FOCUS_DAY",
			day: newFocus.getDate()
		});
	} else {
		store.dispatch({
			type: "FOCUS",
			focusString: newFocus.toString()
		});
	}
}

const Dispatcher = {
	Zoom,
	Focus
};
export default Dispatcher;