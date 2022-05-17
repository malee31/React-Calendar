import "../styles/createEventModal.css"
import store, { rState } from "../ReduxStore";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "../scripts/useTextInput";
import { addEvent, newEvent } from "../scripts/eventStorage";
import { ImmediateCapturedProvider, useCapturedProviderValue } from "use-captured-state";

export default function CreateEventModal() {
	const [show, setShow] = useState(rState().modalVisibility);
	useEffect(() => {
		return store.subscribe(() => {
			setShow(rState().modalVisibility);
		});
	}, []);

	const capturedProviderValue = useCapturedProviderValue();
	const {values} = capturedProviderValue;

	const clear = () => {
		return console.log("Bug in use-captured-state. Pretend like it cleared");
		// capturedProviderValue.batchUpdateKeys({
		// 	title: "",
		// 	description: "",
		// 	start: "",
		// 	end: "",
		// });
	}

	const overlayRef = useRef();

	const hide = () => {
		store.dispatch({
			type: "SET_EVENT_MODAL_VISIBILITY",
			visible: false
		});
	};

	const submit = () => {
		console.log(values);
		addEvent(5, 2022, newEvent(values.title, values.description, values.start, values.end));
		store.dispatch({
			type: "REFRESH_EVENTS"
		});
		hide();
		clear();
	}

	return show && (
		<ImmediateCapturedProvider value={capturedProviderValue}>
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

					<TextInput
						label="Event Title"
						name="title"
					/>
					<TextInput
						label="Description"
						name="description"
					/>
					<TextInput
						label="Start Time"
						name="start"
						type="datetime-local"
					/>
					<TextInput
						label="End Time"
						name="end"
						type="datetime-local"
					/>

					<div
						className="create-event-modal-button"
						onClick={submit}
					>
						Add Event
					</div>
				</div>
			</div>
		</ImmediateCapturedProvider>
	);
}