import "../styles/sectionPadding.css";

export default function SectionPadding(props) {
	return (
		<div className="section-padding">
			{props.children}
		</div>
	);
}