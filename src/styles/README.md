# Notable classes
Due to this project being written in React, there are some conditional style classes that should be applied when certain criteria are met.<br>
This file splits these classes into sections and lists off the class names and when they will be applied.<br>
Use advanced CSS selector like descendent selectors to conditionally style elements based on those criteria.

## Focus
* `.focused-weekday-label`: Applied to the label for the day of the week that the focused day is on
* `.focused-day-of-week`: Applied to the CalendarRow that contains the focused week
* `.focused-week`: Applied to the CalendarRow that contains the focused week
* `.focused-day`: Applied to the CalendarCell that contains the focused day

## Zoom
* `zoom-level-month`: Applied when showing the entire month
* `zoom-level-week`: Applied when showing an entire week
* `zoom-level-day`: Applied when showing a singular day
