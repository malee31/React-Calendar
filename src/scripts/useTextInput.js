import useCapturedState from "use-captured-state";
import "../styles/textInput.css";

export function TextInput({ name, label, type = "text" }) {
	const [value, setValue] = useCapturedState(name);
	const onChange = e => setValue(e.target.value);
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