import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as LeftArrowIcon } from 'assets/left-arrow-icon.svg';

import styles from 'styles/components/_Breadcrumb.module.scss';

type Props = {
	links: {
		label: string;
		to: string;
	}[];
};

const Breadcrumb: React.FC<Props> = ({ links }) => {
	const location = useLocation();

	const linksJSX = links.map((link, idx) => (
		<Fragment key={idx}>
			{idx > 0 && <span className={styles.separator}>/</span>}

			<li className={location.pathname === link.to ? styles.active : ''}>
				<Link to={link.to}>{link.label}</Link>
			</li>
		</Fragment>
	));

	return (
		<nav className={styles.breadcrumb}>
			<ol className={styles.list}>
				<li>
					<Link to="/">
						<LeftArrowIcon />
					</Link>
				</li>

				{linksJSX}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
