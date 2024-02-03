import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LeftArrowIcon } from 'assets/left-arrow-icon.svg';

import styles from 'styles/components/_Breadcrumb.module.scss';

type Props = {
	links: {
		label: string;
		to: string;
	}[];
};

const Breadcrumb: React.FC<Props> = ({ links }) => {
	return (
		<nav className={styles.breadcrumb}>
			<ol className={styles.list}>
				<li>
					<Link to="/">
						<LeftArrowIcon />
					</Link>
				</li>

				{links.map((link, idx) => (
					<Fragment key={idx}>
						{idx > 0 && <span className={styles.separator}>/</span>}

						<li className={`${idx === 1 ? styles.active : ''}`}>
							<Link to={link.to}>{link.label}</Link>
						</li>
					</Fragment>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
