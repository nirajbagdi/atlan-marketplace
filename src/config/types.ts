import * as tf from '@tensorflow/tfjs';

type PreprocessFunction = (input: any) => tf.Tensor;

type PostprocessFunction = (predictions: tf.Tensor) => Promise<any> | any;

export type BaseModelConfig = {
    inputType: 'image' | 'text';
    outputType: 'classification' | 'text';
    inputSize: number;
    baseUrl: string;
    fromTfHub?: boolean;
    preprocess: PreprocessFunction;
    postprocess: PostprocessFunction;
    component: React.FC<ModelComponentProps>;
};

export type ModelComponentProps = {
    model: BaseModelConfig;
    loadedModel: tf.GraphModel;
};

export type ModelConfigMap = Record<string, BaseModelConfig>;

export type ClassificationResult = {
    className: string;
    probability: string;
};
