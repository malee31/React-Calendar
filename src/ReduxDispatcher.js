import store from "./ReduxStore";

function Zoom (level) {
	store.dispatch({
		type: "ZOOM",
		zoom: level
	});
}

const Dispatcher = {
	Zoom
};
export default Dispatcher;