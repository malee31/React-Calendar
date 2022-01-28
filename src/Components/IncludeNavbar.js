import "../styles/navbar.css";

export default function IncludeNavbar(props) {
	return (
		<>
			<nav>
				<a href="#">
					Home
				</a>
			</nav>
			<main>
				{props.children}
			</main>
		</>
	);
}