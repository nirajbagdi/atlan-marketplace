import { ReactComponent as IconPlus } from 'assets/icon-plus.svg';
import { ReactComponent as LandingIllustration } from 'assets/landing-illustration.svg';

import styles from 'styles/components/_Header.module.scss';

const Header = () => (
	<header className={styles.header}>
		<div className={styles.content}>
			<h2>Models</h2>

			<p>
				Search and discover hundreds of trained, ready-to-deploy machine learning models in
				one place.
			</p>

			<button>
				<IconPlus />
				New Model
			</button>
		</div>

		<div className={styles.illustration}>
			<LandingIllustration />
		</div>
	</header>
);

export default Header;
