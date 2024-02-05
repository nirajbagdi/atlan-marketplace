import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import { ReactComponent as UploadIcon } from 'assets/upload-icon.svg';

import styles from 'styles/components/_ModelSpace.module.scss';

const ImageToText: React.FC = () => {
	const [isProcessing, setIsProcessing] = useState(false);
	const [outputText, setOutputText] = useState<string | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const imageFile = event.target.files?.[0];

		if (!imageFile) {
			setImagePreview(null);
			return null;
		}

		const previewURL = URL.createObjectURL(imageFile);
		setImagePreview(previewURL);
	};

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();

		setIsProcessing(true);

		/*
            Instead of directly sending the image to the backend for model processing,
            the following code simulates the model output for demonstration purposes.
        */

		setTimeout(() => {
			setIsProcessing(false);
			setOutputText('Simulated model output');
		}, 3000);
	};

	return (
		<form className={styles.form} onSubmit={handleFormSubmit}>
			<div className={styles.image}>
				{imagePreview && <img src={imagePreview} alt="Uploaded Image" />}
			</div>

			<div className={styles.input}>
				<label htmlFor="image">
					<UploadIcon /> Upload Image
				</label>

				<input type="file" id="image" accept="image/*" onChange={handleImageChange} />
			</div>

			{imagePreview && <button>{isProcessing ? 'Processing...' : 'Generate Text'}</button>}

			{outputText && <p className={styles.output}>{outputText}</p>}
		</form>
	);
};

export default ImageToText;
