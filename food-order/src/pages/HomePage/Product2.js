import React, { useEffect, useState } from 'react'
import { Image, Card, Button, Typography, message, List } from 'antd'
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getProductStore, updateCart, updateNumCart } from './MainFunction';

let count = 20;

function Product2() {
    let navigate = useNavigate();
    const [dishList, setDishList] = useState([]);
    const [page, setPage] = useState(1);
    const [maxIndex, setMaxIndex] = useState();
    let { typeId } = useParams();
    const [numCart, setNumCart] = useOutletContext();

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

    function numPages() {
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
                updateNumCart(setNumCart)
                message.success({
                    content: 'Thêm vào giỏ hàng thành công!',
                    style: { color: 'green' }
                })
            }
        })
    }

    const handleOrder = (dishId) => {
        let temp = dishList.filter(dish => {
            if (dish.id === dishId) {
                updateCart(dish)
                updateNumCart(setNumCart)
                navigate('/cart/pay')
            }
        })
    }

    const loadMore = page < numPages() && (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button className="moreBtn" onClick={() => onLoadMore(page)}>Loading more</Button>
      </div>
    ) ;

    useEffect(() => {
        render();
    }, [])

    return (
        <div className="content-container">
            <div className="title">
                Món ăn
            </div>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 6
                }}
                loadMore={loadMore}
                dataSource={dishList}
                renderItem={(dish, index) => {
                    return (index >= 0 && index < maxIndex &&
                        <List.Item>
                            <Card
                                cover={
                                    <Link to={`/${typeId}/${dish.id}`}>
                                        <Image preview={false} className="dish-image" width="100%" alt={dish.name} src={dish.imageS} />
                                        <Typography.Title ellipsis={{ rows: 1, tooltip: dish.name }} className="dish-name">{dish.name}</Typography.Title>
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
                        </List.Item>
                    )
                }}
            />
        </div>
    )
}

export default Product2