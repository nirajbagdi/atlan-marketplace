import * as tf from '@tensorflow/tfjs';

export function loadImageToImageData(
    imageSrc: string,
    callback: (imgData: ImageData) => void
) {
    const img = new Image();
    img.src = imageSrc;

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        callback(imageData);
    };

    img.onerror = function () {
        console.error('Failed to load image');
    };
}

export const preprocessImage = (imgData: ImageData, size: number) =>
    tf.browser
        .fromPixels(imgData)
        .resizeNearestNeighbor([size, size])
        .toFloat()
        .div(tf.scalar(255))
        .expandDims();

export const fetchLabels = async (url: string): Promise<string[]> => {
    const response = await fetch(url);
    const data = await response.json();
    return Object.values(data).map((entry) => (entry as [string, string])[1]);
};

export const getTopKClasses = (probabilities: unknown, labels: string[], k = 3) =>
    [...(probabilities as [])]
        .map((prob, index) => ({ index, prob }))
        .sort((a, b) => b.prob - a.prob)
        .slice(0, k)
        .map(({ index, prob }) => ({
            className: labels[index] || `Class ${index}`,
            probability: (prob * 100).toFixed(2),
        }));
