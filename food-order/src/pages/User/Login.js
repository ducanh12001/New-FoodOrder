import React, { useContext } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { getUserStore } from './UserFunction';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../Auth/AuthContext';

const validateMessages = {
    required: 'Vui lòng điền ${label}!',
    pattern: {
        mismatch: "${name} không hợp lệ",
    }
};

function Login() {

    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(AuthContext)

    const onFinish = (values) => {
        let users = getUserStore()
        let temp = users.filter(user => user.email === values.email && user.password === values.password)
        if (temp[0] === undefined) {
            document.querySelector('.login-error').style.display = 'block'
        } else {
            setCurrentUser(temp[0])
            document.querySelector('.login-error').style.display = 'none'
            navigate('/')
        }
    };

    return (
        <Form
            className="login-form"
            validateMessages={validateMessages}
            labelAlign="left"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        pattern: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
            </Form.Item>
            <div className="login-error"><span>Sai tài khoản hoặc mật khẩu</span></div>
            <Form.Item
                name="remember"
                valuePropName="checked"
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item className="action-btn">
                <Button className="login-form-button" type="primary" htmlType="submit">Login</Button>
                <a className="login-form-forgot" href="">
                    Forgot password?
                </a>
            </Form.Item>
        </Form>
    )
}

export default Login