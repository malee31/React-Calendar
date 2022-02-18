import "../styles/calendar.css";
import store from "../ReduxStore";
import { useCallback, useEffect, useState } from "react";

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

	const focusCell = useCallback(() => {
		if(!props.dayNum) {
			return;
		}

		if(store.getState().zoom === "WEEK") {
			store.dispatch({
				type: "ZOOM",
				zoom: "DAY"
			});
		}

		store.dispatch({
			type: "FOCUS_TO",
			day: props.dayNum
		});
	}, [props.dayNum]);

	return (
		<div className={`calendar-cell ${props.isWeekend ? "weekend" : ""} ${props.disabled ? "disabled" : ""}`} onClick={focusCell}>
			<CalendarCellLayer className="calendar-cell-number">
				<span>{dayNum}</span>
			</CalendarCellLayer>
			<CalendarCellLayer/>
		</div>
	);
}

function CalendarRow(props) {
	const focusRow = useCallback(() => {
		console.log(`Focus: ${props.weekData.weekNumber}`);
		console.log(`Zoom: ${store.getState().zoom}`);
		store.dispatch({
			type: "FOCUS_TO",
			day: (props.weekData.days.find(day => day && day.dayNumber === store.getState().focus.day.dayNumber) || props.weekData.days.find(day => Boolean(day))).day
		});

		if(store.getState().zoom === "MONTH") {
			store.dispatch({
				type: "ZOOM",
				zoom: "WEEK"
			});
		}
	}, [props.weekData]);

	return (
		<div className="calendar-row" onClick={focusRow}>
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
	// console.log("Month Decremented");
	store.dispatch({
		type: "FOCUS",
		offset: -1
	});
}

function incrementMonth() {
	// console.log("Month Incremented");
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

function CalendarWeekdays(props) {
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const usedDays = typeof props.only === "number" ? [weekdays[props.only]] : weekdays;

	return (
		<div className="calendar-weekdays">
			{usedDays.map(day =>
				<div key={`${day}-Label`}>
					{day}
				</div>
			)}
		</div>
	);
}

function CalendarContent(props) {
	return (
		<div className="calendar-content">
			{props.children}
		</div>
	);
}

export default function Calendar() {
	const [focusObj, setFocus] = useState(store.getState().focus);
	const [zoomValue, setZoom] = useState(store.getState().zoom);
	const monthData = focusObj.month;

	useEffect(() => {
		return store.subscribe(() => {
			// console.log("Store state change detected by Calendar");
			// TODO: Check to make sure unchanged values don't fire a re-render
			setFocus(store.getState().focus);
			setZoom(store.getState().zoom);
		});
	}, []);

	let RenderedContents;
	// TODO: Allow specifying week or day number
	switch(zoomValue) {
		case "DAY":
			RenderedContents =
				<CalendarCell dayNum={focusObj.day.day} isWeekend={focusObj.day.isWeekend} key={`Day-${focusObj.day.day}`}/>;
			break;
		case "WEEK":
			RenderedContents =
				<CalendarRow weekData={focusObj.week} key={`Month-${monthData.month}-Week-${focusObj.week.weekNumber}`}/>;
			break;
		case "MONTH":
			RenderedContents = focusObj.month.weeks.map(weekData =>
				<CalendarRow weekData={weekData} key={`Month-${monthData.month}-Week-${weekData.weekNumber}`}/>
			);
			break;
		default:
			RenderedContents = "Invalid Zoom Value";
	}

	return (
		<div className="calendar-wrapper">
			<CalendarHeader>
				{monthData.monthName} {monthData.year}
			</CalendarHeader>
			<CalendarWeekdays only={zoomValue === "DAY" ? focusObj.day.dayNumber : ""}/>
			<CalendarContent>
				{RenderedContents}
			</CalendarContent>
		</div>
	);
}