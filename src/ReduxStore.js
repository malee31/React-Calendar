import { configureStore } from '@reduxjs/toolkit';

const initialState = {
	today: (new Date()).toString(),
	focus: (new Date()).toString()
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