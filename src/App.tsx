import ModelsGrid from 'components/ModelsGrid';
import modelsData from 'data/models.json';

const App: React.FC = () => (
	<div className="container">
		<ModelsGrid masonry models={modelsData} />
	</div>
);

export default App;
