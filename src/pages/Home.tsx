import Hero from 'components/Hero';
import AllModels from 'components/Models/AllModels';
import FeaturedModels from 'components/Models/FeaturedModels';

import modelsData from 'data/models.json';

const Home = () => {
	const featuredModels = modelsData.filter(model => model.featured);

	return (
		<>
			<Hero />

			<main>
				<FeaturedModels models={featuredModels} />
				<AllModels models={modelsData} />
			</main>
		</>
	);
};

export default Home;