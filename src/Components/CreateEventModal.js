import "../styles/createEventModal.css"
import store, { rState } from "../ReduxStore";
import { useEffect, useRef, useState } from "react";

export default function CreateEventModal() {
	const [show, setShow] = useState(rState().modalVisibility);
	useEffect(() => {
		return store.subscribe(() => {
			setShow(rState().modalVisibility);
		});
	}, []);

	const overlayRef = useRef();

	const hide = () => {
		store.dispatch({
			type: "SET_EVENT_MODAL_VISIBILITY",
			visible: false
		});
	};

	return show && (
		<div ref={overlayRef} className="create-event-modal-overlay" onClick={e => {
			if(e.target === overlayRef.current) {
				hide();
			}
		}}>
			<div
				className="create-event-modal-hide-button"
				onClick={hide}
			>
				✖
			</div>
			<div className="create-event-modal">
				<h2 className="create-event-modal-title">Add New Event</h2>
				<div
					className="create-event-modal-button"
					onClick={() => {}}
				>
					Add Event
				</div>
			</div>
		</div>
	);
}