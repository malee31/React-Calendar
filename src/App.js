import { Provider } from 'react-redux';
import ReduxStore from './ReduxStore.js';
import IncludeNavbar from "./Components/IncludeNavbar";
import Calendar from "./Components/Calendar";
import './styles/App.css';
import SectionPadding from "./Components/SectionPadding";

function App() {
	return (
		<Provider store={ReduxStore}>
			<div className="App">
				<IncludeNavbar>
					<SectionPadding>
						<Calendar/>
					</SectionPadding>
				</IncludeNavbar>
			</div>
		</Provider>
	);
}

export default App;
