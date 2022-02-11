import "../styles/calendar.css";
import store from "../ReduxStore";
import getMonthData from "../scripts/dateData";
import { useEffect, useState } from "react";

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
	return (
		<div className={`calendar-cell ${props.isWeekend ? "weekend" : ""} ${props.disabled ? "disabled" : ""}`}>
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
			{props.weekData.days
				.map((dayData, index) => {
					if(dayData === null) {
						return <CalendarCell dayNum="" disabled={true} key={`Disabled-${index}`}/>;
					} else {
						return <CalendarCell dayNum={dayData.day} isWeekend={dayData.isWeekend} key={`Day-${dayData.day}`}/>;
					}
				})
			}
		</div>
	);
}

function decrementMonth() {
	console.log("Month Decremented");
	store.dispatch({
		type: "FOCUS",
		offset: -1
	});
}

function incrementMonth() {
	console.log("Month Incremented");
	store.dispatch({
		type: "FOCUS",
		offset: 1
	});
}

function CalendarHeader(props) {
	return (
		<div className="calendar-header">
			<div className="calendar-header-controls-left" onClick={decrementMonth}>
				&lt;
			</div>
			<div>
				{props.children}
			</div>
			<div className="calendar-header-controls-right" onClick={incrementMonth}>
				&gt;
			</div>
		</div>
	);
}

function CalendarWeekdays() {
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return (
		<div className="calendar-weekdays">
			{weekdays.map(day =>
				<div>
					{day}
				</div>
			)}
		</div>
	);
}

export default function Calendar() {
	console.log("Render");
	// Using toString as a workaround for IDE type checking
	const [focusValue, setFocus] = useState(store.getState().focus.toString());
	useEffect(() => {
		return store.subscribe(() => {
			console.log("Store state change detected by Calendar");
			setFocus(store.getState().focus);
		});
	}, []);

	const focus = new Date(focusValue);
	const monthData = getMonthData(focus.getFullYear(), focus.getMonth());

	return (
		<div className="calendar-wrapper">
			<CalendarHeader>
				{focus.toLocaleString("default", { month: "long" })} {focus.getFullYear()}
			</CalendarHeader>
			<CalendarWeekdays/>
			{monthData.weeks.map(weekData =>
				<CalendarRow weekData={weekData} key={`Month-${monthData.month}-Week-${weekData.weekNumber}`}/>
			)}
		</div>
	);
}