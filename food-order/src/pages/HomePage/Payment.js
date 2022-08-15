import React, { useEffect, useState } from 'react'
import { Button, Table, Image, Form, Input, Select, message } from 'antd';
import { getDishInCart, renderNumCart, resetStore } from './MainFunction';
import { useNavigate } from 'react-router-dom';

const axios = require('axios');

const validateMessages = {
  required: 'Bắt buộc!',
};

function Payment() {
  let navigate = useNavigate();
  const [cart, setCart] = useState(getDishInCart())
  const [cartList, setCartList] = useState([]);
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [city, setCity] = useState([]);
  const [quan, setQuan] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [citySelect, setCitySelect] = useState(false);
  const [quanSelect, setQuanSelect] = useState(false);
  const [phuongSelect, setPhuongSelect] = useState(false);

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
      render: (text, record) => <div>{text}</div>
    },
    {
      title: 'Tổng',
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      render: (text) => <div>{text}đ</div>
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

  const handleCityChange = (newValue) => {
    renderQuan(newValue);
    setValue(newValue);
  }

  const handleQuanChange = (newValue) => {
    renderPhuong(newValue);
    setValue(newValue);
  }

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const renderCity = () => {
    axios.get('https://provinces.open-api.vn/api/p/')
      .then(function (response) {
        setCity(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const renderQuan = (cityCode) => {
    axios.get('https://provinces.open-api.vn/api/d/')
      .then(function (response) {
        let temp = response.data;
        temp = temp.filter(data => data.province_code === cityCode)
        setQuan(temp)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const renderPhuong = (quanCode) => {
    axios.get('https://provinces.open-api.vn/api/w/')
      .then(function (response) {
        let temp = response.data;
        temp = temp.filter(data => data.district_code === quanCode)
        setPhuong(temp)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handlePay = () => {
    resetStore()
    navigate('/final')
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
      </Table.Summary.Row>
    )
  }

  const cancelPay = () => {
    resetStore()
    navigate('/')
  }

  useEffect(() => {
    renderCity()
    render()
  }, [])

  return (
    <div>
      <div className="shopping-cart">
        <div className="title">Thanh toán</div>
        <div className="table-container">
          <Table
            pagination={false}
            summary={(pageData) => showTotalPrice(pageData)}
            locale={{ emptyText: 'Bạn chưa có sản phẩm nào.' }}
            columns={columns}
            dataSource={cartList}
          />
        </div>
      </div>
      <div className="ship-container">
        <div className="title">Thông tin giao hàng</div>
        <Form form={form} labelCol={{ span: 5 }} validateMessages={validateMessages} labelAlign="left" onFinish={handlePay}>
          <Form.Item
            name="city"
            label="Tỉnh/Thành phố"
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
          >
            <Select
              style={{
                width: 200,
              }}
              placeholder="Chọn Tỉnh/Thành phố"
              value={value}
              onChange={handleCityChange}

            >
              {city.map(data => {
                return (
                  <Select.Option key={data.code} value={data.code}>{data.name}</Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="quan"
            label="Quận (Huyện)"
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
          >
            <Select
              style={{
                width: 200,
              }}
              placeholder="Chọn Quận (Huyện)"
              value={value}
              onChange={handleQuanChange}
            >
              {quan.map(data => {
                return (
                  <Select.Option key={data.code} value={data.code}>{data.name}</Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="phuong"
            label="Phường (Xã)"
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
          >
            <Select
              style={{
                width: 200,
              }}
              placeholder="Chọn Phường (Xã)"
              value={value}
              onChange={handleChange}
            >
              {phuong.map(data => {
                return (
                  <Select.Option key={data.code} value={data.code}>{data.name}</Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ nhà"
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
          >
            <Input id="address" />
          </Form.Item>
          <Form.Item>
            <div className="btn-div">
              <Button className="cancelBtn" onClick={cancelPay} >Hủy</Button>
              <Button className="payBtn" htmlType="submit">Thanh toán</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Payment