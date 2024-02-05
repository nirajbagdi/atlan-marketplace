import { lazy, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Loader from 'components/Layout/Loader';

const Home = lazy(() => import('pages/Home'));
const NewModel = lazy(() => import('pages/NewModel'));
const SingleModel = lazy(() => import('pages/SingleModel'));
const TryItOut = lazy(() => import('pages/TryItOut'));

const App: React.FC = () => {
	const location = useLocation();

	// Scroll to top
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<Suspense fallback={<Loader />}>
			<Routes location={location} key={location.pathname}>
				<Route index Component={Home} />
				<Route path="/models/new" Component={NewModel} />
				<Route path="/models/:modelSlug" Component={SingleModel} />
				<Route path="/models/:modelSlug/try" Component={TryItOut} />
			</Routes>
		</Suspense>
	);
};

export default App;
