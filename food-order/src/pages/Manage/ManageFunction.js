export class Dish {
    constructor(name, price, descriptionS, descriptionF, address, imageS, imageB) {
        this.name = name;
        this.price = price;
        this.descriptionS = descriptionS;
        this.descriptionF = descriptionF;
        this.address = address;
        this.imageB = imageB;
        this.imageS = imageS;
    }
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

export const handleFile = async (file) => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    return file.preview;
}