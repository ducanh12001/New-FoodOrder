import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { addUserStore, getUserStore, setUserStore, User } from './UserFunction';
import { nanoid } from 'nanoid'

const validateMessages = {
  required: 'Please input your ${label}!',
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
        label="Password"
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
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
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
        label="Full Name"
        rules={[
          {
            required: true,
            message: 'Please input your full name!',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
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
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignUp