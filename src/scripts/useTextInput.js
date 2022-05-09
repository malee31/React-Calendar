import { useState } from "react";
import "../styles/textInput.css"

export default function useTextInput(label) {
	const [value, setValue] = useState("");
	const updateValue = e => {
		setValue(e.target.value);
	};

	return {
		label: label,
		value: value,
		setValue: setValue,
		onChange: updateValue
	};
}

export function TextInput({ label, value, onChange, type = "text" }) {
	return (
		<label className="use-text-input-label">
			{label}
			<input
				className="use-text-input-entry"
				type={type}
				onChange={onChange}
				value={value}
			/>
		</label>
	);
}