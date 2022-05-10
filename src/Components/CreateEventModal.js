import "../styles/createEventModal.css"
import store, { rState } from "../ReduxStore";
import { useEffect, useRef, useState } from "react";
import useTextInput, { TextInput } from "../scripts/useTextInput";
import { addEvent, newEvent } from "../scripts/eventStorage";

export default function CreateEventModal() {
	const [show, setShow] = useState(rState().modalVisibility);
	useEffect(() => {
		return store.subscribe(() => {
			setShow(rState().modalVisibility);
		});
	}, []);

	const inputs = {
		title: useTextInput("Event Title"),
		description: useTextInput("Description"),
		start: useTextInput("Start Time"),
		end: useTextInput("End Time")
	}

	const inputData = {
		title: inputs.title.value,
		description: inputs.description.value,
		start: inputs.start.value,
		end: inputs.end.value
	};

	const clear = () => {
		for(const input in inputs) {
			if(inputs.hasOwnProperty(input)) {
				inputs[input].setValue("");
			}
		}
	}

	const overlayRef = useRef();

	const hide = () => {
		store.dispatch({
			type: "SET_EVENT_MODAL_VISIBILITY",
			visible: false
		});
	};

	const submit = () => {
		console.log(inputData);
		addEvent(5, 2022, newEvent(inputData.title, inputData.description, inputData.start, inputData.end));
		store.dispatch({
			type: "REFRESH_EVENTS"
		});
		hide();
		clear();
	}

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

				<TextInput {...inputs.title}/>
				<TextInput {...inputs.description}/>
				<TextInput type="datetime-local" {...inputs.start}/>
				<TextInput type="datetime-local" {...inputs.end}/>

				<div
					className="create-event-modal-button"
					onClick={submit}
				>
					Add Event
				</div>
			</div>
		</div>
	);
}