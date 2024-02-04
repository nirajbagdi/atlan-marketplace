import { useAppCtx } from 'store/context';

import Hero from 'components/Hero';
import AllModels from 'components/Models/AllModels';
import FeaturedModels from 'components/Models/FeaturedModels';

const Home = () => {
	const { models } = useAppCtx();

	const featuredModels = models.filter(model => model.featured);

	return (
		<div className="container">
			<Hero />

			<main>
				<FeaturedModels models={featuredModels} />
				<AllModels models={models} />
			</main>
		</div>
	);
};

export default Home;
