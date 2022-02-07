import { configureStore } from '@reduxjs/toolkit';

const TODAY = new Date();
const initialState = {
	today: TODAY.toString(),
	focus: TODAY.toString(),
	navEnabled: false
};

function rootReducer(state = initialState, action) {
	switch(action.type) {
		case "FOCUS":
			console.log("Focus changed");
			const focus = new Date(state.focus);
			focus.setMonth(focus.getMonth() + action.offset);
			focus.setDate(1);
			console.log(`Focus: ${focus} + ${JSON.stringify(action)}`);
			return {
				...state,
				focus: focus.toString()
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