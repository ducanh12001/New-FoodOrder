import { message } from 'antd'
const axios = require('axios');

export const loadTypeDish = () => {
    axios.get('https://62cfe5951cc14f8c087fabdf.mockapi.io/api/type')
        .then(function (response) {
            localStorage.setItem('types', JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const loadComment = () => {
    axios.get('https://62cfe5951cc14f8c087fabdf.mockapi.io/api/comment')
        .then(function (response) {
            localStorage.setItem('comments', JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const loadDish = () => {
    axios.get('https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products')
        .then(function (response) {
            localStorage.setItem('products', JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        })
}

export function getTypeStore() {
    let myTypes;
    if (localStorage.getItem('types') === null) {
        myTypes = []
    } else {
        myTypes = JSON.parse(localStorage.getItem('types'));
    }
    return myTypes;
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

export function getCommentStore() {
    let myTypes;
    if (localStorage.getItem('comments') === null) {
        myTypes = []
    } else {
        myTypes = JSON.parse(localStorage.getItem('comments'));
    }
    return myTypes;
}

export function addCommentStore(comment) {
    const comments = getCommentStore();
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments))
}

//
export function numInCart(dish) {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
        numCart = parseFloat(numCart);
        localStorage.setItem('numInCart', numCart+1);
    } else {
        localStorage.setItem('numInCart', 1)
    }
    setInCart(dish)
}

export function setInCart(dish) {
    let carts = localStorage.getItem('dishInCart');
    carts = JSON.parse(carts);
    if (carts!== null) {
        if (carts[dish.id] === undefined) {
            carts = {
                ...carts,
                [dish.id]: {
                    id: dish.id,
                    name: dish.name,
                    image: dish.imageS,
                    price: dish.price,
                    quantity: 0
                }
            }
        }
        carts[dish.id].quantity += 1;
    }  else {
        carts = {
            [dish.id]: {
                id: dish.id,
                name: dish.name,
                image: dish.imageS,
                price: dish.price,
                quantity: 1
            }
        };
    }
    localStorage.setItem('dishInCart', JSON.stringify(carts));
}

export function totalPrice(dish) {
    let priceCart = localStorage.getItem('totalPrice');
    if (priceCart) {
        priceCart = parseFloat(priceCart);
        localStorage.setItem('totalPrice', priceCart + dish.price);
    } else {
        localStorage.setItem('totalPrice', dish.price);
    }
}

export function renderNumCart() {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
        document.querySelector('.dish-num .num').innerHTML = numCart;
    }
}

export function getDishInCart() {
    let myProducts;
    if (localStorage.getItem('dishInCart') === null) {
        myProducts = []
    } else {
        myProducts = JSON.parse(localStorage.getItem('dishInCart'));
    }
    return myProducts;
}

export const updateCart = (dish) => {
    numInCart(dish)
    totalPrice(dish)
    renderNumCart()
}

export const resetStore = () => {
    document.querySelector('.dish-num .num').innerHTML = 0;
    localStorage.setItem('numInCart', 0);
    localStorage.setItem('totalPrice', 0);
    localStorage.removeItem('dishInCart');
}