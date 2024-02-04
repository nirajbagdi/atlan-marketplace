import { useAppCtx } from 'store/context';

import Hero from 'components/Hero';
import AllModels from 'components/Models/AllModels';
import FeaturedModels from 'components/Models/FeaturedModels';
import { ReactComponent as Loader } from 'assets/loader.svg';

const Home = () => {
	const { models, isLoading } = useAppCtx();

	const featuredModels = models.filter(model => model.featured);

	const fallbackJSX = (
		<div className="loader">
			<Loader />
		</div>
	);

	const modelsJSX = (
		<>
			<FeaturedModels models={featuredModels} />
			<AllModels models={models} />
		</>
	);

	return (
		<div className="container">
			<Hero />
			<main>{isLoading ? fallbackJSX : modelsJSX}</main>
		</div>
	);
};

export default Home;
