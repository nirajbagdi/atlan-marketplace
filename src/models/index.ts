export type TModel = {
	id: number;
	name: string;
	category: string;
	summary: string;
	provider: string;
	featured: boolean;
	potentialUseCases: string[];

	stats: {
		likes: number;
		downloads: number;
	};
};
