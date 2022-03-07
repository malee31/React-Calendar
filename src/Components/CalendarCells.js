import "../styles/calendar.css";
import "../styles/calendarCell.css";
import {rState} from "../ReduxStore";
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
	const dayNum = props.dayNum ?? -1;

	const focusCell = () => {
		if(!props.dayNum) {
			return;
		}

		Dispatcher.FocusDay(props.dayNum);

		if(rState().zoom === "WEEK") {
			Dispatcher.Zoom("DAY");
		}
	};

	if(props.disabled) {
		return <div
			className={`calendar-cell ${props.isWeekend ? "weekend" : ""} ${props.disabled ? "disabled" : ""} ${props.collapse ? "flex-collapse" : "flex-collapsible"}`}
		/>;
	}

	return (
		<div
			className={`calendar-cell ${props.isWeekend ? "weekend" : ""} ${props.collapse ? "flex-collapse" : "flex-collapsible"} ${props.focused ? "focused-day" : ""}`}
			onClick={focusCell}
		>
			<CalendarCellLayer className="calendar-event-layer">
				<div className="calendar-cell-number">{dayNum}</div>
				<div className="calendar-event-container">
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
					<div className="calendar-event-entry">
						Sample Event
					</div>
				</div>
			</CalendarCellLayer>
		</div>
	);
}

export default CalendarCell;