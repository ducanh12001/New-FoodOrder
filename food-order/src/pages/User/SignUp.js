import React, { useContext } from 'react'
import { Button, Form, Input, message } from 'antd';
import { addUserStore, getUserStore, User } from './UserFunction';
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Auth/AuthContext';

const validateMessages = {
  required: 'Vui lòng điền ${label}!',
  pattern: {
    mismatch: "${name} không hợp lệ!",
  },
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 11,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 13,
    },
  },
};

function SignUp() {

  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(AuthContext)
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const user = new User(nanoid(), values.email, values.password, values.fullname, values.phone);
    let users = getUserStore();
    let temp = users.find((user) => user.email === values.email)
    if (temp) {
      message.error({
        content: 'Email đã được đăng ký',
        style: { color: 'red'}
      })
    } else {
      addUserStore(user);
      setCurrentUser(user);
      navigate('/')
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      {...formItemLayout}
      className="signup-form"
      validateMessages={validateMessages} 
      labelAlign="left"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            pattern: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            min: 6
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Vui lòng xác nhận mật khẩu!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              } 

              return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="fullname"
        label="Họ tên"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            pattern: '^[0-9]{1,15}$'
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset:11,
          span: 13,
        }}
      >
        <Button type="primary" htmlType="submit">Đăng ký</Button>
      </Form.Item>
    </Form>
  )
}

export default SignUp