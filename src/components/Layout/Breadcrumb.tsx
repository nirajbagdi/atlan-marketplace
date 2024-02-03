import { Fragment } from 'react';

import { ReactComponent as LeftArrowIcon } from 'assets/left-arrow-icon.svg';

import styles from 'styles/components/_Breadcrumb.module.scss';

const Breadcrumb = () => {
	const links = [
		{ label: 'Models', to: '/' },
		{ label: 'BERT', to: '/model-detail' },
	];

	return (
		<nav className={styles.breadcrumb}>
			<ol className={styles.list}>
				<li>
					<a href="/">
						<LeftArrowIcon />
					</a>
				</li>

				{links.map((link, idx) => (
					<Fragment key={idx}>
						{idx > 0 && <span className={styles.separator}>/</span>}

						<li className={`${idx === 1 ? styles.active : ''}`}>
							<a href={link.to}>{link.label}</a>
						</li>
					</Fragment>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
