import "../styles/calendar.css";

function CalendarCell(props) {
	return (
		<div className={`calendar-cell ${props.disabled ? "disabled" : ""}`}>
			Cell
		</div>
	);
}

function CalendarRow(props) {
	return (
		<div className="calendar-row">
			<CalendarCell disabled/>
			<CalendarCell/>
			<CalendarCell/>
			<CalendarCell/>
			<CalendarCell/>
			<CalendarCell/>
			<CalendarCell disabled/>
		</div>
	);
}


function CalendarHeader(props) {
	return (
		<div className="calendar-header">
			Calendar
		</div>
	);
}

export default function Calendar(props) {
	return (
		<div className="calendar-wrapper">
			<CalendarHeader/>
			<CalendarRow/>
			<CalendarRow/>
			<CalendarRow/>
			<CalendarRow/>
			<CalendarRow/>
		</div>
	);
}