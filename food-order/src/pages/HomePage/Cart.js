import React, { useEffect, useState } from 'react'
import { Button, Table, Image, message } from 'antd';
import { getDishInCart, renderNumCart } from './MainFunction';
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Cart() {
    let navigate = useNavigate();
    const [cart, setCart] = useState(getDishInCart())
    const [cartList, setCartList] = useState([]);

    const columns = [
        {
            title: '',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <Image width='100%' height={80} src={text} alt="Image" />,
            width: 150,
            align: 'center',
        },
        {
            title: 'Tên món',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: (text) => <div>{text}đ</div>
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (text, record) => {
                return (
                    <div className="item-button">
                        <Button shape="circle" icon={<MinusCircleOutlined />} className="minusBtn" onClick={() => minusQuantity(record.key)}/>
                        <span className="item-num">{text}</span>
                        <Button shape="circle" icon={<PlusCircleOutlined />} className="plusBtn" onClick={() => plusQuantity(record.key)} />
                    </div>
                )
            }
        },
        {
            title: 'Tổng',
            dataIndex: 'total',
            key: 'total',
            align: 'right',
            render: (text) => <div>{text}đ</div>
        }
        ,
        {
            title: 'Action',
            dataIndex: 'delete',
            key: 'delete',
            align: 'center',
            render: (text, record) => {
                return (
                    <Button className="trash-icon" onClick={() => deleteDish(record.key)}>
                        <DeleteOutlined />
                    </Button>
                )
            }
        }
    ]

    const render = () => {
        let temp = [];
        Object.values(cart).forEach((dish) => {
            temp.push({
                key: dish.id,
                id: dish.id,
                image: dish.image,
                name: dish.name,
                price: dish.price,
                quantity: dish.quantity,
                total: dish.quantity * dish.price
            })
        })
        setCartList(temp);
        renderNumCart()
    }

    const minusQuantity = (dishId) => {
        let totalPrice = localStorage.getItem('totalPrice');
        totalPrice = parseFloat(totalPrice);
        let numInCart = localStorage.getItem('numInCart');
        numInCart = parseFloat(numInCart);
        cartList.map((dish) => {
            if (dish.id === dishId && cart[dish.id].quantity > 0) {
                numInCart = numInCart - 1;
                localStorage.setItem('numInCart', numInCart);
                totalPrice = totalPrice - cart[dish.id].price;
                localStorage.setItem('totalPrice', totalPrice);
                cart[dish.id].quantity -= 1;
                if (cart[dish.id].quantity === 0) {
                    delete cart[dish.id];
                }
                localStorage.setItem('dishInCart', JSON.stringify(cart));
            }
        })
        render();
    }

    const plusQuantity = (dishId) => {
        let totalPrice = localStorage.getItem('totalPrice');
        totalPrice = parseFloat(totalPrice);
        let numInCart = localStorage.getItem('numInCart');
        numInCart = parseFloat(numInCart);
        cartList.map(dish => {
            if (dish.id === dishId) {
                cart[dish.id].quantity += 1;
                localStorage.setItem('dishInCart', JSON.stringify(cart));
                numInCart = numInCart + 1;
                localStorage.setItem('numInCart', numInCart);
                totalPrice = totalPrice + cart[dish.id].price;
                localStorage.setItem('totalPrice', totalPrice);
            }
        })
        render()
    }

    const deleteDish = (dishId) => {
        let totalPrice = localStorage.getItem('totalPrice');
        totalPrice = parseFloat(totalPrice);
        let numInCart = localStorage.getItem('numInCart');
        numInCart = parseFloat(numInCart);
        cartList.map(dish => {
            if (dish.id === dishId) {
                numInCart = numInCart - dish.quantity;
                localStorage.setItem('numInCart', numInCart);
                totalPrice = totalPrice - cart[dish.id].price * cart[dish.id].quantity;
                localStorage.setItem('totalPrice', totalPrice);
                delete cart[dish.id];
                localStorage.setItem('dishInCart', JSON.stringify(cart));
            }
        })
        render()
    }

    const goPay = () => {
        if (cartList.length === 0) {
            message.warning({
                content: 'Bạn chưa có sản phẩm nào.',
                style: {
                    color: 'orange'
                }
            })
        } else {
            navigate('/cart/pay')
        }
    }

    const showTotalPrice = (pageData) => {
        let priceCart = localStorage.getItem('totalPrice');
        return (
            <Table.Summary.Row>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell><div className="total-text">Tổng tiền:</div></Table.Summary.Cell>
                <Table.Summary.Cell><div className="total-text">{priceCart ? priceCart : 0}đ</div></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
            </Table.Summary.Row>
        )
    }

    useEffect(() => {
        render()
    }, [])

    return (
        <div className="shopping-cart">
            <div className="title">Giỏ hàng</div>
            <div className="table-container">
                <Table
                    pagination={false}
                    summary={(pageData) => showTotalPrice(pageData)}
                    locale={{ emptyText: 'Bạn chưa có sản phẩm nào.' }}
                    columns={columns}
                    dataSource={cartList}
                />
            </div>
            <div className="btn-container">
                <Button className="payBtn" onClick={goPay}>Đặt hàng</Button>
            </div>
        </div>
    )
}

export default Cart