import * as tf from '@tensorflow/tfjs';

import { preprocessImage, getTopKClasses } from 'utils';
import { PREDICTION_LABELS } from './labels';
import { ModelConfigMap } from './types';

const modelConfig: ModelConfigMap = {
    inceptionv3: {
        inputType: 'image',
        outputType: 'classification',
        inputSize: 224,

        baseUrl:
            'https://www.kaggle.com/models/google/inception-v3/TfJs/classification/2',
        fromTfHub: true,

        preprocess(imgData: ImageData) {
            return preprocessImage(imgData, this.inputSize);
        },

        async postprocess(predictions: tf.Tensor) {
            const { indices } = tf.topk(predictions, 3);
            const probsArray = indices.dataSync();

            return [
                PREDICTION_LABELS[probsArray[0]],
                PREDICTION_LABELS[probsArray[1]],
                PREDICTION_LABELS[probsArray[2]],
            ];
        },
    },

    resnet50: {
        inputType: 'image',
        outputType: 'classification',
        inputSize: 224,

        baseUrl:
            'https://www.kaggle.com/models/google/resnet-v2/TfJs/101-classification/2',
        fromTfHub: true,

        preprocess(imgData: ImageData) {
            return preprocessImage(imgData, this.inputSize);
        },

        async postprocess(predictions: tf.Tensor) {
            const probabilities = tf.softmax(predictions);
            const probsArray = probabilities.dataSync();

            return getTopKClasses(probsArray, PREDICTION_LABELS);
        },
    },

    /*
    bert: {
        inputType: 'text',
        outputType: 'text',
        baseUrl: '../tfjsModels/bert/model.json',

        preprocess(text: string) {
            // Tokenization logic for BERT
            return text.split(' ').map((word) => word.toLowerCase());
        },

        postprocess(predictions: tf.Tensor) {
            return predictions.arraySync(); // Convert tensor to array for NLP models
        },
    },
    */
};

export default modelConfig;
