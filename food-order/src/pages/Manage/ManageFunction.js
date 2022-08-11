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

const axios = require('axios');
export const loadDish = () => {
    axios.get('https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products')
        .then(function (response) {
            localStorage.setItem('products', JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        })
}

export function getProductStore() {
    let myProducts;
    if (localStorage.getItem('products') === null) {
        myProducts = []
    } else {
        myProducts = JSON.parse(localStorage.getItem('products'));
    }
    return myProducts;
}

export function addDishStore(dish) {
    const dishes = getProductStore();
    dishes.push(dish);
    localStorage.setItem("products", JSON.stringify(dishes))
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