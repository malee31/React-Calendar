import "../styles/calendar.css";

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
	const dayNum = props.dayNum || -1;
	return (
		<div className={`calendar-cell ${props.disabled ? "disabled" : ""}`}>
			<CalendarCellLayer className="calendar-cell-number">
				<span>{dayNum}</span>
			</CalendarCellLayer>
			<CalendarCellLayer/>
		</div>
	);
}

function CalendarRow(props) {
	return (
		<div className="calendar-row">
			{
				[...Array(7).keys()]
					.map(num => num + props.start)
					.map((dayNum, index) =>
						<CalendarCell dayNum={dayNum} disabled={index === 0 || index === 6} key={dayNum}/>
					)
			}
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
			<CalendarRow start={1}/>
			<CalendarRow start={8}/>
			<CalendarRow start={15}/>
			<CalendarRow start={22}/>
			<CalendarRow start={29}/>
		</div>
	);
}