import React, { useEffect, useState } from 'react'
import { Image, Card, Button, Typography, Comment, List, Form, Input, Avatar, message } from 'antd'
import { useNavigate, useParams } from "react-router-dom";
import { DollarCircleOutlined } from '@ant-design/icons';
import { addCommentStore, getCommentStore, getProductStore, loadComment, updateCart } from './MainFunction';

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);

function Detail() {
    let navigate = useNavigate();
    const [dish, setDish] = useState([]);
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    let { dishId } = useParams();

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = () => {
        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            addCommentStore({
                username: 'Han Solo',
                avatar: 'https://joeschmoe.io/api/v1/random',
                comment: value
            })
            renderComment()
        }, 1000);
    };

    const renderComment = () => {
        let commentList = getCommentStore();
        let commentTemp = [];
        commentList.forEach((comment) => {
            commentTemp.push({
                author: comment.username,
                avatar: comment.avatar,
                content: <p>{comment.comment}</p>,
            })
        })
        setComments(commentTemp)
    }

    const render = () => {
        let dishes = getProductStore();
        let temp = dishes.filter(dish => dish.id === dishId)
        setDish(temp[0]);
    }

    const handleAddToCart = () => {
        updateCart(dish)
        message.success({
            content: 'Thanh cong',
            style: { color: 'green' }
        })
    }

    const handleOrder = () => {
        updateCart(dish)
        navigate('/cart/pay')
    }

    useEffect(() => {
        loadComment();
        render();
        renderComment()
    }, [])

    return (
        <div>
            <div className="cart-container">
                <Card
                    cover={
                        <Image width="500px" height="300px" alt={dish.name} src={dish.imageS} />
                    }
                    bordered={false}
                    bodyStyle={{ width: '50%', marginLeft: 70 }}
                    className="info-card"
                >
                    <div className="name-dish">{dish.name}</div>
                    <div className="address">{dish.address}</div>
                    <div className="rating">
                        <div className="point">{dish.rate}/5</div>
                        <div className="number-rating">10</div>
                    </div>
                    <div className="price">
                        <DollarCircleOutlined />{" "}
                        {dish.price}<sup>đ</sup>
                    </div>
                    <Typography.Paragraph ellipsis={{ rows: 2, tooltip: dish.descriptionS }} className="description">{dish.descriptionF}</Typography.Paragraph>
                    <div className="btn-group">
                        <Button className="cartBtn" onClick={handleAddToCart}>Add to cart</Button>
                        <Button className="orderBtn" onClick={handleOrder}>Order Now</Button>
                    </div>
                </Card>
            </div>
            <div className="comment-container">
                <h3>Đánh giá của khách hàng</h3>
                <Comment
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                        <>
                            <Form.Item>
                                <Input.TextArea rows={4} onChange={handleChange} value={value} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                                    Thêm bình luận
                                </Button>
                            </Form.Item>
                        </>
                    }
                />
                {comments.length > 0 && <CommentList comments={comments} />}
            </div>
        </div>
    )
}

export default Detail