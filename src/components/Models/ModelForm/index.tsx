import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { useAppCtx } from 'store/context';

import styles from 'styles/components/_ModelForm.module.scss';

const ModelForm: React.FC = () => {
	const nameInputRef = useRef<HTMLInputElement>(null);
	const summaryInputRef = useRef<HTMLInputElement>(null);
	const categoryInputRef = useRef<HTMLInputElement>(null);
	const providerInputRef = useRef<HTMLInputElement>(null);
	const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
	const codeInputRef = useRef<HTMLTextAreaElement>(null);

	const navigate = useNavigate();

	const { addModel } = useAppCtx();

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const isEmpty = (str: string) => str.trim().length === 0;

		const name = nameInputRef.current!.value;
		const summary = summaryInputRef.current!.value;
		const category = categoryInputRef.current!.value;
		const provider = providerInputRef.current!.value;
		const description = descriptionInputRef.current!.value;
		const codeSnippet = codeInputRef.current!.value;

		if (
			isEmpty(name) &&
			isEmpty(summary) &&
			isEmpty(category) &&
			isEmpty(provider) &&
			isEmpty(description) &&
			isEmpty(codeSnippet)
		)
			return null;

		const modelObj = {
			id: uuid(),
			slug: name.toLowerCase().replace(/ /g, '_'),
			name,
			summary,
			category,
			provider,
			description,
			codeSnippet,
			useCases: [],
			featured: false,

			stats: {
				likes: 0,
				downloads: 0,
			},
		};

		addModel(modelObj);
		navigate('/');
	};

	return (
		<form className={styles.form} onSubmit={handleFormSubmit}>
			<div className={styles.row}>
				<label htmlFor="name">Model Name</label>

				<input
					required
					ref={nameInputRef}
					type="text"
					id="name"
					placeholder="Describe your model"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="summary">Model Summary</label>

				<input
					required
					ref={summaryInputRef}
					type="text"
					id="summary"
					placeholder="Briefly summarize your model"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="category">Model Category</label>

				<input
					required
					ref={categoryInputRef}
					type="text"
					id="category"
					placeholder="e.g., NLP, Image Recognition"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="provider">Model Provider</label>

				<input
					required
					ref={providerInputRef}
					type="text"
					id="provider"
					placeholder="e.g., OpenAI, TensorFlow"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="description">Model Description</label>

				<textarea
					required
					ref={descriptionInputRef}
					id="description"
					rows={10}
					placeholder={`Introduce your model with a brief overview highlighting its main features.\n\nIn the next paragraph, delve into the functionalities it offers, such as task capabilities and supported formats.\n\nFinally, outline potential use cases to give users insights into the practical applications of your model. Be concise yet informative to captivate your audience.`}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="snippet">Code Snippet</label>

				<textarea
					required
					ref={codeInputRef}
					id="snippet"
					rows={10}
					placeholder="Provide a concise example demonstrating how to use your model. Include essential code for users to quickly integrate and test."
				/>
			</div>

			<button>Add Model</button>
		</form>
	);
};

export default ModelForm;
