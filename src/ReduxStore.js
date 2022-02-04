import { configureStore } from '@reduxjs/toolkit';

const initialState = {
	today: new Date(),
	focus: new Date()
};

function rootReducer(state = initialState, action) {
	switch(action.type) {
		default:
			return state;
	}
}

export default configureStore({
	reducer: rootReducer,
	devTools: true
});