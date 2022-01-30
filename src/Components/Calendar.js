import "../styles/calendar.css";

function CalendarCell(props) {
	return (
		<div className="calendar-cell">
			Cell
		</div>
	);
}

function CalendarRow(props) {
	return (
		<div className="calendar-row">
			<CalendarCell/>
			<CalendarCell/>
			<CalendarCell/>
			<CalendarCell/>
			<CalendarCell/>
			<CalendarCell/>
			<CalendarCell/>
		</div>
	);
}

export default function Calendar(props) {
	return (
		<div className="calendar-wrapper">
			<CalendarRow/>
			<CalendarRow/>
			<CalendarRow/>
			<CalendarRow/>
			<CalendarRow/>
		</div>
	);
}