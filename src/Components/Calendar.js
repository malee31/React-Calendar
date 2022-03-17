import "../styles/calendar.css";
import store, { rState } from "../ReduxStore";
import { useEffect, useState } from "react";
import CalendarRow from "./CalendarRow";
import {CalendarHeader, CalendarControls, CalendarWeekdays} from "./CalendarParts";

/**
 * Top level container for all Calendar components
 * Conditional classes are applied to the row container
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