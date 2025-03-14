import * as tf from '@tensorflow/tfjs';

import { preprocessImage, getTopKClasses, fetchLabels } from 'utils';
import { INCEPTION_CLASSES } from './inceptionLabels';

const modelConfig: any = {
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
                INCEPTION_CLASSES[probsArray[0]],
                INCEPTION_CLASSES[probsArray[1]],
                INCEPTION_CLASSES[probsArray[2]],
            ];
        },
    },

    resnet50: {
        inputType: 'image',
        outputType: 'classification',
        inputSize: 224,

        baseUrl:
            'https://www.kaggle.com/models/google/resnet-v2/TfJs/101-classification/2',
        labelsUrl:
            'https://storage.googleapis.com/download.tensorflow.org/data/imagenet_class_index.json',
        fromTfHub: true,

        preprocess(imgData: ImageData) {
            return preprocessImage(imgData, this.inputSize);
        },

        async postprocess(predictions: tf.Tensor) {
            const probabilities = tf.softmax(predictions);
            const probsArray = probabilities.dataSync();

            const labels = await fetchLabels(this.labelsUrl);
            return getTopKClasses(probsArray, labels);
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
