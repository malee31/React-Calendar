import "../styles/createEventModal.css"
import store, { rState } from "../ReduxStore";
import { useEffect, useState } from "react";

export default function CreateEventModal() {
	const [show, setShow] = useState(rState().modalVisibility);
	useEffect(() => {
		return store.subscribe(() => {
			setShow(rState().modalVisibility);
		});
	}, []);

	return show && (
		<div className="create-event-modal-overlay">
			<div className="create-event-modal">
				Create Event
				<div
					className="create-event-modal-hide-button"
					onClick={() => store.dispatch({
						type: "SET_EVENT_MODAL_VISIBILITY",
						visible: false
					})}
				>
					Hide
				</div>
			</div>
		</div>
	);
}