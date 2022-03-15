import "../styles/calendar.css";
import "../styles/calendarCell.css";
import { rState } from "../ReduxStore";
import Dispatcher from "../ReduxDispatcher";

/**
 * Constructs an additional overlay for a parent CalendarCell
 * @param {string} [props.className] Used to add additional classes to the layer for CSS styling
 * @param {Object} [props.style] Additional styles to tack onto the layer (inline)
 * @param {JSX.Element|string} props.children Contents of cell layer
 * @return {JSX.Element} Absolutely positioned overlay for a CalendarCell
 * @constructor
 */
function CalendarCellLayer(props) {
	const additionalStyle = Object.assign({}, props.style);
	const additionalClasses = [
		"calendar-cell-layer",
		props.className || ""
	].filter(val => Boolean(val));

	return (
		<div className={additionalClasses.join(" ")} style={additionalStyle}>
			{props.children}
		</div>
	);
}

/**
 * Used to display and contain the contents of a single day on the Calendar
 * @param {boolean} [props.collapse = false] Whether to collapse and hide the cell horizontally
 * @param {boolean} [props.isWeekend = false] Whether the current cell contains a weekend day
 * @param {boolean} [props.focusedDayOfWeek = false] Whether the current cell contains a day that has the same day of the week as the focus
 * @param {boolean} [props.focused = false] Whether the current cell IS the focus
 * @param {number} props.dayNum The day of the month to display in the corner
 * @return {JSX.Element} A single cell on the calendar
 * @constructor
 */
function CalendarCell(props) {
	const additionalClasses = [
		"calendar-cell",
		props.collapse ? "flex-collapse" : "flex-collapsible",
		props.isWeekend && "weekend",
		props.focusedDayOfWeek && "focused-day-of-week",
		props.focused && "focused-day"
	].filter(val => Boolean(val));

	const focusCell = () => {
		Dispatcher.FocusDay(props.dayNum);

		if(rState().zoom === "WEEK") {
			Dispatcher.Zoom("DAY");
		}
	};

	return (
		<div
			className={additionalClasses.join(" ")}
			onClick={focusCell}
		>
			<CalendarCellLayer className="calendar-event-layer">
				<div className="calendar-cell-number">{props.dayNum}</div>
				<div className="calendar-event-container">
					{Array(15).fill(0).map(() => (
						<div className="calendar-event-entry">
							Sample Event
						</div>
					))}
				</div>
			</CalendarCellLayer>
		</div>
	);
}

/**
 * A blank cell that exists purely to take up space
 * @param {boolean} [props.collapse = false] Whether to collapse and hide the cell horizontally
 * @return {JSX.Element} Returns a grayed out rectangle to use as a blank cell
 * @constructor
 */
export function DisabledCalendarCell(props) {
	const additionalClasses = [
		"calendar-cell",
		"disabled",
		props.collapse ? "flex-collapse" : "flex-collapsible",
	].filter(val => Boolean(val));

	return <div
		className={additionalClasses.join(" ")}
	/>;
}

export default CalendarCell;