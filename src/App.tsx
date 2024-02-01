import Header from 'components/Header';
import FeaturedModels from 'components/FeaturedModels';

import modelsData from 'data/models.json';

const App: React.FC = () => {
	const featuredModels = modelsData.filter(model => model.featured);

	return (
		<div className="container">
			<Header />

			<main>
				<FeaturedModels models={featuredModels} />
			</main>
		</div>
	);
};

export default App;
