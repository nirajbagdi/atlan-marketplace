import { Link } from 'react-router-dom';

import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg';
import { ReactComponent as LandingIllustration } from 'assets/landing-illustration.svg';

import styles from 'styles/components/_Hero.module.scss';

const Hero = () => (
	<header className={styles.hero}>
		<div className={styles.content}>
			<h2>Models</h2>

			<p>
				Search and discover hundreds of trained, ready-to-deploy machine learning models in
				one place.
			</p>

			<button>
				<Link to="/models/new">
					<PlusIcon /> New Model
				</Link>
			</button>
		</div>

		<div className={styles.illustration}>
			<LandingIllustration />
		</div>
	</header>
);

export default Hero;
