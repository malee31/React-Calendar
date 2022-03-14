import "../styles/calendar.css";
import "../styles/calendarCell.css";
import { rState } from "../ReduxStore";
import Dispatcher from "../ReduxDispatcher";

function CalendarCellLayer(props) {
	const additionalStyle = Object.assign({}, props.style);
	const additionalClasses = props.className || "";
	return (
		<div className={`calendar-cell-layer ${additionalClasses}`} style={additionalStyle}>
			{props.children}
		</div>
	);
}

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
					{Array(15).map(() => (
						<div className="calendar-event-entry">
							Sample Event
						</div>
					))}
				</div>
			</CalendarCellLayer>
		</div>
	);
}

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