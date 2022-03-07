import "../styles/calendar.css";
import store, { rState } from "../ReduxStore";
import Dispatcher from "../ReduxDispatcher";
import { useEffect, useState } from "react";
import CalendarCell from "./CalendarCells";

/**
 * Creates and manages a row/week in the calendar
 * @param {boolean} [props.collapse=false] When set to true, the row collapses vertically to a height of 0
 * @param {WeekData} props.weekData WeekData to render for the row
 * @param {DayData|false} [props.dayCollapse] If set to a DayData object, all days of the week will be collapsed except for the day that has a matching day of week value
 * @param {boolean} [props.focused] Whether this week is the focused week
 * @return {JSX.Element}
 * @constructor
 */
function CalendarRow(props) {
	const focusRow = () => {
		Dispatcher.FocusDay((props.weekData.days.find(day => day && day.dayNumber === rState().focus.day.dayNumber) || props.weekData.days.find(day => Boolean(day))).day);

		if(rState().zoom === "MONTH") {
			Dispatcher.Zoom("WEEK");
		}
	}

	return (
		<div className={`calendar-row ${props.collapse ? "flex-collapse" : "flex-collapsible"} ${props.focused ? "focused-week" : ""}`} onClick={focusRow}>
			{props.weekData.days
				.map((dayData, index) => {
					if(dayData === null) {
						return <CalendarCell collapse={Boolean(props.dayCollapse) && props.dayCollapse.dayNumber !== index} dayNum="" disabled={true} key={`Disabled-${index}`}/>;
					} else {
						return <CalendarCell focused={rState().focus.day === dayData} collapse={Boolean(props.dayCollapse) && props.dayCollapse.dayNumber !== index} dayNum={dayData.day} isWeekend={dayData.isWeekend} key={`Day-${dayData.day}`}/>;
					}
				})
			}
		</div>
	);
}

/**
 * Contains the month label and controls for the calendar
 * @param {JSX.Element|string} [props.children] The label in the center of the header
 * @return {JSX.Element}
 * @constructor
 */
function CalendarHeader(props) {
	const zoom = rState().zoom;
	// TODO: Fix wrapping months when offsetting by weeks
	const offset = {
		month: zoom === "MONTH" ? 1 : 0,
		week: zoom === "WEEK" ? 1 : 0,
		day: zoom === "DAY" ? 1 : 0
	}

	return (
		<div className="calendar-header">
			<div className="calendar-header-controls-left" onClick={() => Dispatcher.Focus({
				month: -offset.month,
				week: -offset.week,
				day: -offset.day
			})}>
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

/**
 * Contains labels for the days of the week
 * @param {number} [props.only] If set to a number between 0-6, only the label for that day of the week will be shown while the others will be collapsed
 * @return {JSX.Element}
 * @constructor
 */
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

/**
 * Contains the control for changing the zoom level of the calendar
 * @return {JSX.Element}
 * @constructor
 */
function CalendarControls() {
	const [currentZoom, setZoom] = useState(rState().zoom);
	const [showDropdown, setShow] = useState(false);
	useEffect(() => {
		return store.subscribe(() => {
			setZoom(rState().zoom);
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

/**
 * Top level container for all Calendar components
 * @return {JSX.Element}
 * @constructor
 */
export default function Calendar() {
	const [focusObj, setFocus] = useState(rState().focus);
	const [zoomValue, setZoom] = useState(rState().zoom);
	const monthData = focusObj.month;

	useEffect(() => {
		return store.subscribe(() => {
			// TODO: Check to make sure unchanged values don't fire a re-render
			setFocus(rState().focus);
			setZoom(rState().zoom);
		});
	}, []);

	return (
		<div className="calendar-wrapper">
			<CalendarHeader>
				{monthData.monthName} {monthData.year}
			</CalendarHeader>
			<CalendarControls/>
			<CalendarWeekdays only={zoomValue === "DAY" ? focusObj.day.dayNumber : ""}/>
			<div className={`calendar-content zoom-level-${zoomValue.toLowerCase()}`}>
				{focusObj.month.weeks.map(weekData =>
					<CalendarRow
						weekData={weekData}
						key={`Month-${monthData.month}-Week-${weekData.weekNumber}`}
						collapse={zoomValue !== "MONTH" && weekData !== focusObj.week}
						focused={weekData === focusObj.week}
						dayCollapse={zoomValue === "DAY" ? focusObj.day : false}
					/>
				)}
			</div>
		</div>
	);
}