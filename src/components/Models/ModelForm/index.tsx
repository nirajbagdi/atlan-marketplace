import styles from 'styles/components/_ModelForm.module.scss';

const ModelForm: React.FC = () => (
	<form className={styles.form}>
		<div className={styles.row}>
			<label htmlFor="name">Model Name</label>
			<input type="text" id="name" placeholder="Describe your model" />
		</div>

		<div className={styles.row}>
			<label htmlFor="summary">Model Summary</label>
			<input type="text" id="summary" placeholder="Briefly summarize your model" />
		</div>

		<div className={styles.row}>
			<label htmlFor="category">Model Category</label>
			<input type="text" id="category" placeholder="e.g., NLP, Image Recognition" />
		</div>

		<div className={styles.row}>
			<label htmlFor="provider">Model Provider</label>
			<input type="text" id="provider" placeholder="e.g., OpenAI, TensorFlow" />
		</div>

		<div className={styles.row}>
			<label htmlFor="description">Model Description</label>

			<textarea
				id="description"
				rows={10}
				placeholder={`Introduce your model with a brief overview highlighting its main features.\n\nIn the next paragraph, delve into the functionalities it offers, such as task capabilities and supported formats.\n\nFinally, outline potential use cases to give users insights into the practical applications of your model. Be concise yet informative to captivate your audience.`}
			/>
		</div>

		<div className={styles.row}>
			<label htmlFor="snippet">Code Snippet</label>

			<textarea
				id="snippet"
				rows={10}
				placeholder="Provide a concise example demonstrating how to use your model. Include essential code for users to quickly integrate and test."
			/>
		</div>

		<button>Add Model</button>
	</form>
);

export default ModelForm;
