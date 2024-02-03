import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { TModel } from 'models';
import ModelDetailsAside from './ModelDetailsAside';

import styles from 'styles/components/_ModelDetails.module.scss';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
	model: TModel;
};

const ModelDetails: React.FC<Props> = ({ model }) => (
	<article className={styles.model}>
		<header>
			<h1>{model.name}</h1>
			<span>{model.provider}</span>
			<p>{model.summary}</p>
		</header>

		<div className={styles.main}>
			<section className={styles.details}>
				<h2>Model Details</h2>

				<ReactMarkdown children={model.description} />
			</section>

			<section className={styles.usage}>
				<h2>Usage</h2>

				<SyntaxHighlighter
					language="javascript"
					style={docco}
					children={model.codeSnippet}
				/>
			</section>
		</div>

		<ModelDetailsAside model={model} />
	</article>
);

export default ModelDetails;
