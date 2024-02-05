import ModelForm from 'components/Models/ModelForm';
import Breadcrumb from 'components/Layout/Breadcrumb';

import styles from 'styles/components/_ModelForm.module.scss';

const NewModel = () => {
	const breadcrumbLinks = [
		{ label: 'Models', to: '/' },
		{ label: 'New Model', to: '/models/new' },
	];

	return (
		<section className={styles.container}>
			<Breadcrumb links={breadcrumbLinks} />

			<h2>Add model details</h2>
			<ModelForm />
		</section>
	);
};

export default NewModel;
