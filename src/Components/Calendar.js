import "../styles/calendar.css";
import store from "../ReduxStore";
import { useEffect } from "react";

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
			{props.weekData
				.map(dayData => <CalendarCell dayNum={dayData.dayOfMonth} disabled={dayData.isWeekend || !dayData.isInMonth} key={dayData.dateString}/>)}
		</div>
	);
}


function CalendarHeader(props) {
	return (
		<div className="calendar-header">
			{props.children}
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
	while(dateProbe.getDay() !== 0) {
		// Jump back to the closest preceding Sunday if needed
		dateProbe.setDate(dateProbe.getDate() - 1);
	}
	for(let weekNum = 0; weekNum < 5; weekNum++) {
		monthData.push([]);
		for(let dayNum = 0; dayNum < 7; dayNum++) {
			const dayOfWeek = dateProbe.getDay();
			const probedMonth = dateProbe.getMonth();
			monthData[weekNum][dayNum] = {
				year: dateProbe.getFullYear(),
				month: probedMonth,
				dayOfMonth: dateProbe.getDate(),
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
	useEffect(() => {
		return store.subscribe(() => {
			console.log("Store state change detected by Calendar");
		});
	}, []);

	const today = store.getState().today;
	const monthData = getMonthData(today.getFullYear(), today.getMonth());
	return (
		<div className="calendar-wrapper">
			<CalendarHeader>
				{today.toLocaleString("default", { month: "long" })} {today.getFullYear()}
			</CalendarHeader>
			{monthData.map((weekData, weekNum) => <CalendarRow weekData={weekData} key={`Week-${weekNum}`}/>)}
		</div>
	);
}