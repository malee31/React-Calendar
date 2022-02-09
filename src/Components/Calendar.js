import "../styles/calendar.css";
import store from "../ReduxStore";
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
	const dayNum = props.dayNum || -1;
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
			{props.weekData
				.map(dayData => <CalendarCell dayNum={dayData.dayOfMonth} isWeekend={dayData.isWeekend} disabled={!dayData.isInMonth} key={dayData.dateString}/>)}
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

/**
 * Returns a size 5 array of weeks in a month. Each week is another array containing objects with data about each day<br>
 * The days start on Sunday and the first week will contain the first day of the month. There WILL be overflow into the next and/or previous month's days
 * @param {number} year Year to get month data from
 * @param {number} month Month to get month data from (Zero-indexed)
 * @returns {Object[][]} Returns array described above
 */
function getMonthData(year, month) {
	const monthData = [];
	const dateProbe = new Date(year, month, 1);
	const monthDays = (new Date(year, month + 1, 0)).getDate();
	while(dateProbe.getDay() !== 0) {
		// Jump back to the closest preceding Sunday if needed
		dateProbe.setDate(dateProbe.getDate() - 1);
	}

	let lastDay = 0;
	for(let weekNum = 0; lastDay < monthDays; weekNum++) {
		monthData.push([]);
		for(let dayNum = 0; dayNum < 7; dayNum++) {
			const dayOfWeek = dateProbe.getDay();
			const probedMonth = dateProbe.getMonth();
			const dayOfMonth = dateProbe.getDate();
			if(dayOfMonth > lastDay && weekNum > 1) {
				lastDay = dayOfMonth;
			}

			monthData[weekNum][dayNum] = {
				year: dateProbe.getFullYear(),
				month: probedMonth,
				dayOfMonth: dayOfMonth,
				dayOfWeek: dayOfWeek,
				week: weekNum,
				isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
				isInMonth: probedMonth === month,
				dateString: dateProbe.toISOString()
			};
			dateProbe.setDate(dateProbe.getDate() + 1);
		}
	}
	return monthData;
}

export default function Calendar(props) {
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
			{monthData.map((weekData, weekNum) => <CalendarRow weekData={weekData} key={`Week-${weekNum}`}/>)}
		</div>
	);
}