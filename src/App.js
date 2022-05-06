import { Provider } from 'react-redux';
import ReduxStore from './ReduxStore.js';
import Calendar from "./Components/Calendar";
import './styles/App.css';
import CreateEventModal from "./Components/CreateEventModal";

function App() {
	return (
		<Provider store={ReduxStore}>
			<div className="App disable-select">
				<main>
					<CreateEventModal/>
					<Calendar/>
				</main>
			</div>
		</Provider>
	);
}

export default App;
