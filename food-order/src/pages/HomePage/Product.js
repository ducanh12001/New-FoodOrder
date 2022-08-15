import React, { useEffect, useState } from 'react'
import { Image, Card, Button, Typography, message } from 'antd'
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductStore, updateCart } from './MainFunction';
let count = 20;

function Product() {
    let navigate = useNavigate();
    const [dishList, setDishList] = useState([]);
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [maxIndex, setMaxIndex] = useState();
    let { typeId } = useParams();

    const render = () => {
        let dishes = getProductStore();
        typeId = parseFloat(typeId);
        let temp = dishes.filter((dish, index) => dish.type === typeId);
        setDishList(temp);
        setMaxIndex(count);
    }

    const checkPage = (page) => {
        if (page > numPages()) page = numPages();
        if (page === numPages()) {
            document.querySelector('.moreBtn').style.display = 'none'
        } else {
            document.querySelector('.moreBtn').style.display = 'block'
        }
    }

    function numPages()
    {
        return Math.ceil(dishList.length / count);
    }

    const onLoadMore = (page) => {
        setPage(page++)
        setMaxIndex(page * count);
        checkPage(page)
    };

    const handleAddToCart = (dishId) => {
        let temp = dishList.filter(dish => {
            if (dish.id === dishId) {
                updateCart(dish)
                message.success({
                    content: 'Thanh cong',
                    style: {color: 'green'}
                })
            }
        })
    }

    const handleOrder = (dishId) => {
        let temp = dishList.filter(dish => {
            if (dish.id === dishId) {
                updateCart(dish)
                navigate('/cart/pay')
            }
        })
    }

    useEffect(() => {
        render();
    }, [])

    return (
        <div className="content">
            <div className="title">
                Món ăn
            </div>
            <div className="dish-container">
                {dishList.map((dish, index) => {
                    return (
                        index >= 0 && index < maxIndex &&
                        <div key={dish.id}>
                            <Card
                                cover={
                                    <Link to={`/${typeId}/${dish.id}`}>
                                        <Image preview={false} width="100%" height={150} alt={dish.name} src={dish.imageS} />
                                        <div className="dish-name">{dish.name}</div>
                                    </Link>
                                }
                                actions={[
                                    <Button className="cartBtn" onClick={() => handleAddToCart(dish.id)}>Add to cart</Button>,
                                    <Button className="orderBtn" onClick={() => handleOrder(dish.id)}>Order Now</Button>
                                ]}
                                className="card"
                                bodyStyle={{ height: '100px', marginTop: -20 }}
                            >
                                <div className="data">
                                    <div className="price">{dish.price}đ</div>
                                    <div className="rate">{dish.rate}/5</div>
                                </div>
                                <Typography.Paragraph ellipsis={{ rows: 2, tooltip: dish.descriptionS }} className="description">{dish.descriptionS}</Typography.Paragraph>
                            </Card>
                        </div>
                    )
                })}
            </div>
            {page < numPages() && 
            <div className="more-container">
                <Button className="moreBtn" onClick={() => onLoadMore(page)}>Load More</Button>
            </div>
            }
        </div>
    )
}

export default Product