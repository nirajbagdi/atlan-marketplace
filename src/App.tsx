import { lazy, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Loader from 'components/Loader';

const Home = lazy(() => import('pages/Home'));
const NewModel = lazy(() => import('pages/NewModel'));
const SingleModel = lazy(() => import('pages/SingleModel'));

const App: React.FC = () => {
	const location = useLocation();

	// Scroll to top
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<Suspense fallback={<Loader />}>
			<Routes location={location} key={location.pathname}>
				<Route index element={<Home />} />
				<Route path="/models/new" element={<NewModel />} />
				<Route path="/models/:modelSlug" element={<SingleModel />} />
			</Routes>
		</Suspense>
	);
};

export default App;
