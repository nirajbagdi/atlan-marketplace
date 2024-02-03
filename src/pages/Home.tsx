import Hero from 'components/Hero';
import AllModels from 'components/Models/AllModels';
import FeaturedModels from 'components/Models/FeaturedModels';
import ModelDetails from 'components/Models/ModelDetails';

import modelsData from 'data/models.json';

const Home = () => {
	const featuredModels = modelsData.filter(model => model.featured);

	return <ModelDetails model={modelsData[1]} />;

	// return (
	// 	<>
	// 		<Hero />

	// 		<main>
	// 			<FeaturedModels models={featuredModels} />
	// 			<AllModels models={modelsData} />
	// 		</main>
	// 	</>
	// );
};

export default Home;
