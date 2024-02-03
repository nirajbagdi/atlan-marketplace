import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from 'store';
import App from 'App';

import 'styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
	<Router>
		<AppProvider>
			<App />
		</AppProvider>
	</Router>
);
