import "../styles/calendar.css";
import { rState } from "../ReduxStore";
import Dispatcher from "../ReduxDispatcher";
import CalendarCell, { DisabledCalendarCell } from "./CalendarCells";

/**
 * Creates and manages a row/week in the calendar
 * @param {boolean} [props.collapse=false] When set to true, the row collapses vertically to a height of 0
 * @param {WeekData} props.weekData WeekData to render for the row
 * @param {DayData|false} [props.dayCollapse] If set to a DayData object, all days of the week will be collapsed except for the day that has a matching day of week value
 * @param {boolean} [props.focused] Whether this week is the focused week
 * @return {JSX.Element}
 * @constructor
 */
export default function CalendarRow(props) {
	const additionalClasses = [
		"calendar-row",
		props.collapse ? "flex-collapse" : "flex-collapsible",
		props.focused ? "focused-week" : ""
	].filter(val => Boolean(val));

	const focusRow = () => {
		Dispatcher.FocusDay((props.weekData.days.find(day => day && day.dayNumber === rState().focus.day.dayNumber) || props.weekData.days.find(day => Boolean(day))).day);

		if(rState().zoom === "MONTH") {
			Dispatcher.Zoom("WEEK");
		}
	}

	const focusedDay = rState().focus.day;

	return (
		<div className={additionalClasses.join(" ")} onClick={focusRow}>
			{props.weekData.days
				.map((dayData, index) => {
					if(dayData === null) {
						return <DisabledCalendarCell collapse={Boolean(props.dayCollapse) && props.dayCollapse.dayNumber !== index} key={`Disabled-${index}`}/>;
					} else {
						return <CalendarCell focused={focusedDay === dayData} focusedDayOfWeek={focusedDay.dayOfWeek === dayData.dayOfWeek} collapse={Boolean(props.dayCollapse) && props.dayCollapse.dayNumber !== index} dayData={dayData} key={`Day-${dayData.day}`}/>;
					}
				})
			}
		</div>
	);
}