import "../styles/createEventModal.css"
import store, { rState } from "../ReduxStore";
import { useEffect, useRef, useState } from "react";
import useTextInput, { TextInput } from "../scripts/useTextInput";

export default function CreateEventModal() {
	const [show, setShow] = useState(rState().modalVisibility);
	useEffect(() => {
		return store.subscribe(() => {
			setShow(rState().modalVisibility);
		});
	}, []);

	const inputs = {
		title: useTextInput("Event Title"),
		description: useTextInput("Event Description"),
		start: useTextInput("Event Start Time"),
		end: useTextInput("Event End Time")
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
				<TextInput {...inputs.start}/>
				<TextInput {...inputs.end}/>

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