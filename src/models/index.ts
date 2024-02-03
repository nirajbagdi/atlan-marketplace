export type TModel = {
	id: number;
	slug: string;
	name: string;
	category: string;
	summary: string;
	description: string;
	provider: string;
	codeSnippet: string;
	useCases: string[];
	featured: boolean;

	stats: {
		likes: number;
		downloads: number;
	};
};
