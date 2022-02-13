import { configureStore } from '@reduxjs/toolkit';

const TODAY = new Date();
const initialState = {
	today: TODAY.toString(),
	focus: TODAY.toString(),
	zoom: "MONTH"
};

function rootReducer(state = initialState, action) {
	switch(action.type) {
		case "FOCUS":
			const focus = new Date(state.focus);
			focus.setMonth(focus.getMonth() + action.offset);
			focus.setDate(1);
			console.log(`Focus Changed to ${focus} + ${JSON.stringify(action)}`);
			return {
				...state,
				focus: focus.toString()
			};
		case "ZOOM":
			// TODO: Allow altering whether ["MONTH", "WEEK", "DAY"] are being zoomed in onto
			return {
				zoom: "MONTH",
				...state
			};
		default:
			return state;
	}
}

const store = configureStore({
	reducer: rootReducer,
	devTools: true
});

export default store;