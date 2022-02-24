import "../styles/calendar.css";
import store from "../ReduxStore";
import Dispatcher from "../ReduxDispatcher";
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

function CalendarRow(props) {
	const focusRow = () => {
		store.dispatch({
			type: "FOCUS_DAY",
			day: (props.weekData.days.find(day => day && day.dayNumber === store.getState().focus.day.dayNumber) || props.weekData.days.find(day => Boolean(day))).day
		});

		if(store.getState().zoom === "MONTH") {
			Dispatcher.Zoom("WEEK");
		}
	}

	return (
		<div className={`calendar-row ${props.collapse ? "flex-collapse" : "flex-collapsible"}`} onClick={focusRow}>
			{props.weekData.days
				.map((dayData, index) => {
					if(dayData === null) {
						return <CalendarCell collapse={Boolean(props.dayCollapse) && props.dayCollapse.dayNumber !== index} dayNum="" disabled={true} key={`Disabled-${index}`}/>;
					} else {
						return <CalendarCell collapse={Boolean(props.dayCollapse) && props.dayCollapse.dayNumber !== index} dayNum={dayData.day} isWeekend={dayData.isWeekend} key={`Day-${dayData.day}`}/>;
					}
				})
			}
		</div>
	);
}

function CalendarHeader(props) {
	const zoom = store.getState().zoom;
	const offset = {
		month: zoom === "MONTH" ? 1 : 0,
		week: zoom === "WEEK" ? 1 : 0,
		day: zoom === "DAY" ? 1 : 0
	}

	return (
		<div className="calendar-header">
			<div className="calendar-header-controls-left" onClick={() => Dispatcher.Focus({ month: -offset.month, week: -offset.week, day: -offset.day })}>
				&lt;
			</div>
			<div>
				{props.children}
			</div>
			<div className="calendar-header-controls-right" onClick={() => Dispatcher.Focus(offset)}>
				&gt;
			</div>
		</div>
	);
}

function CalendarWeekdays(props) {
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return (
		<div className="calendar-weekdays">
			{weekdays.map((day,) =>
				<div key={`${day}-Label`} className={weekdays[props.only] && weekdays[props.only] !== day ? "flex-collapse" : "flex-collapsible"}>
					{day}
				</div>
			)}
		</div>
	);
}

function CalendarControls() {
	const [currentZoom, setZoom] = useState(store.getState().zoom);
	const [showDropdown, setShow] = useState(false);
	useEffect(() => {
		return store.subscribe(() => {
			setZoom(store.getState().zoom);
		});
	}, []);

	const set = level => {
		Dispatcher.Zoom(level);
		setShow(false);
	};

	const zoomTitleCase = currentZoom[0].toUpperCase() + currentZoom.toLowerCase().slice(1);
	return (
		<div className="calendar-controls">
			<div className="calendar-zoom-control">
				<span onClick={() => setShow(!showDropdown)}>{zoomTitleCase}</span>
				{showDropdown ?
					<div className="calendar-zoom-control-dropdown">
						<div onClick={() => set("MONTH")}>Month</div>
						<div onClick={() => set("WEEK")}>Week</div>
						<div onClick={() => set("DAY")}>Day</div>
					</div> : null}
			</div>
		</div>
	);
}

export default function Calendar() {
	const [focusObj, setFocus] = useState(store.getState().focus);
	const [zoomValue, setZoom] = useState(store.getState().zoom);
	const monthData = focusObj.month;

	useEffect(() => {
		return store.subscribe(() => {
			// TODO: Check to make sure unchanged values don't fire a re-render
			setFocus(store.getState().focus);
			setZoom(store.getState().zoom);
		});
	}, []);

	return (
		<div className="calendar-wrapper">
			<CalendarHeader>
				{monthData.monthName} {monthData.year}
			</CalendarHeader>
			<CalendarControls/>
			<CalendarWeekdays only={zoomValue === "DAY" ? focusObj.day.dayNumber : ""}/>
			<div className="calendar-content">
				{focusObj.month.weeks.map(weekData =>
					<CalendarRow
						weekData={weekData}
						key={`Month-${monthData.month}-Week-${weekData.weekNumber}`}
						collapse={zoomValue !== "MONTH" && weekData !== focusObj.week}
						dayCollapse={zoomValue === "DAY" ? focusObj.day : false}
					/>
				)}
			</div>
		</div>
	);
}