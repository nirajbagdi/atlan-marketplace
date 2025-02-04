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
