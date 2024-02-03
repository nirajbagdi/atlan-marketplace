import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import SingleModel from 'pages/SingleModel';

const App: React.FC = () => (
	<Routes>
		<Route index element={<Home />} />
		<Route path="/models/:modelSlug" element={<SingleModel />} />
	</Routes>
);

export default App;
