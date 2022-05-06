import "../styles/calendarParts.css";
import store, { rState } from "../ReduxStore";
import Dispatcher from "../ReduxDispatcher";
import { useEffect, useState } from "react";

/**
 * Contains the month label and controls for the calendar
 * @param {JSX.Element|string} [props.children] The label in the center of the header
 * @return {JSX.Element}
 * @constructor
 */
export function CalendarHeader(props) {
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
			}, "FLIP")}>
				&lt;
			</div>
			<div>
				{props.children}
			</div>
			<div className="calendar-header-controls-right" onClick={() => Dispatcher.Focus(offset, "FLIP")}>
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
export function CalendarWeekdays(props) {
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
function CalendarDropdownControl() {
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
		<div
			className="calendar-control-button calendar-zoom-control"
			tabIndex="0"
			onBlur={() => setShow(false)}
			onFocus={() => setShow(true)}
		>
				<span
					onMouseDown={e => {
						e.preventDefault();
						e.stopPropagation();
						setShow(!showDropdown)
					}}
				>{zoomTitleCase} ⯆</span>
			{showDropdown ?
				<div className="calendar-zoom-control-dropdown">
					<div onClick={() => set("MONTH")}>Month</div>
					<div onClick={() => set("WEEK")}>Week</div>
					<div onClick={() => set("DAY")}>Day</div>
				</div> : null}
		</div>
	);
}

/**
 * Contains the control for adding events
 * @return {JSX.Element}
 * @constructor
 */
function CalendarControlAddEvent() {
	return (
		<div
			className="calendar-control-button calendar-add-event"
			onClick={() => {}}
		>Add Event＋</div>
	);
}

/**
 * Contains the all the controls contained in the header of the calendar
 * @return {JSX.Element}
 * @constructor
 */
export function CalendarControls() {
	return (
		<div className="calendar-controls">
			<CalendarDropdownControl/>
			<CalendarControlAddEvent/>
		</div>
	);
}