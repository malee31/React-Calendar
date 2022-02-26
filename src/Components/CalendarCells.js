import "../styles/calendar.css";
import store from "../ReduxStore";
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

		store.dispatch({
			type: "FOCUS_DAY",
			day: props.dayNum
		});

		if(store.getState().zoom === "WEEK") {
			Dispatcher.Zoom("DAY");
		}
	};

	return (
		<div
			className={`calendar-cell ${props.isWeekend ? "weekend" : ""} ${props.disabled ? "disabled" : ""} ${props.collapse ? "flex-collapse" : "flex-collapsible"}`}
			onClick={focusCell}
		>
			<CalendarCellLayer className="calendar-cell-number">
				<span>{dayNum}</span>
			</CalendarCellLayer>
			<CalendarCellLayer/>
		</div>
	);
}

export default CalendarCell;