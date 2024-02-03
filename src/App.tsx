import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from 'pages/Home';
import SingleModel from 'pages/SingleModel';

const App: React.FC = () => {
	const location = useLocation();

	// Scroll to top
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<Routes location={location} key={location.pathname}>
			<Route index element={<Home />} />
			<Route path="/models/:modelSlug" element={<SingleModel />} />
		</Routes>
	);
};

export default App;
