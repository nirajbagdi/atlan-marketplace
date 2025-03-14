import * as tf from '@tensorflow/tfjs';

type PreprocessFunction = (input: any) => tf.Tensor;

type PostprocessFunction = (predictions: tf.Tensor) => Promise<any> | any;

type BaseModelConfig = {
    inputType: 'image' | 'text';
    outputType: 'classification' | 'text';
    inputSize: number;
    baseUrl: string;
    fromTfHub?: boolean;
    preprocess: PreprocessFunction;
    postprocess: PostprocessFunction;
};

export type ModelConfigMap = Record<string, BaseModelConfig>;
