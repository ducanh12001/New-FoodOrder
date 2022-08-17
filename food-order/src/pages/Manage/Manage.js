import React, { useEffect, useState } from 'react'
import { Layout, Menu, Input, Button, Table, Image, Modal, Form, Upload, message } from 'antd';
import './manage.css'
import { HomeOutlined, UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Dish, handleFile } from "./ManageFunction"
import { addDishStore, getProductStore } from '../HomePage/MainFunction';

let pageSize = 20;

const { Header, Sider, Content } = Layout;

const validateMessages = {
  required: '${label} là bắt buộc!',
};

function Manage() {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [fileList, setFileList] = useState([])
  const [fileList2, setFileList2] = useState([])
  const [tempDetail, setTempDetail] = useState([])
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '6%',
      align: 'center',
      render: (text, record, index) => (page - 1) * pageSize + index + 1
    },
    {
      title: 'Ảnh nhỏ',
      dataIndex: 'imageS',
      key: 'imageS',
      render: (text) => <Image width='80%' height={60} src={text} alt="Image" />,
      width: '15%',
      align: 'center',
    },
    {
      title: 'Tên món',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a className="dish-details" onClick={() => showDetailModal(record.key)}>{text}</a>,
      width: '20%',
      sorter: (a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Mô tả ngắn',
      dataIndex: 'descriptionS',
      key: 'descriptionS',
      ellipsis: true,
      width: '35%'
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      align: 'right',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rate',
      key: 'rate',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.rate - b.rate,
    },
  ]

  const render = () => {
    let products = getProductStore();
    let tempData = [];
    products.forEach((product) => {
      tempData.push({
        key: product.id,
        imageS: product.imageS,
        name: product.name,
        price: product.price,
        descriptionS: product.descriptionS,
        rate: product.rate,
      });
    })
    setData(tempData)
    setData2(tempData)
  }

  const handleSearch = (e) => {
    const filter = e.target.value;
    setValue(filter)
    let products = data2;
    let result = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].name.toString().toLowerCase().indexOf(filter) > -1 || products[i].descriptionS.toString().toLowerCase().indexOf(filter) > -1) {
        result.push(products[i]);
      }
    }
    setData(result);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showDetailModal = (key) => {
    setIsDetailVisible(true);
    let products = getProductStore();
    let temp;
    temp = products.filter(product => product.id === key)
    setTempDetail(temp[0])
  };

  const handleAdd = async (values) => {
    const imageB = await handleFile(values.imageB.file);
    const imageS = await handleFile(values.imageS.file);
    const dish = new Dish(values.name, values.price, values.descriptionS, values.descriptionF, values.address, imageS, imageB)
    addDishStore(dish);
    form.resetFields();
    setFileList([])
    setFileList2([])
    setIsModalVisible(false);
    message.success('Thêm thành công!');
    render();
  }

  const handleOk = () => {
    setIsModalVisible(false);
    setIsDetailVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDetailVisible(false);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleChange2 = ({ fileList: newFileList2 }) => setFileList2(newFileList2);

  useEffect(() => {
    render();
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo">Manage</div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UnorderedListOutlined />,
                label: 'List',
              },
              {
                key: '2',
                icon: <HomeOutlined />,
                label: 'Home',
              },
            ]}
            onClick={(item) => {
              if (item.key === '2') {
                navigate("/")
              }
            }}
          />
        </Sider>
        <Content className="content">
          <div className="title">
            Danh sách món ăn
            <Input.Group className="btn-group">
              <Input className="search-input" type="text" value={value} id="searchBar" placeholder="Tìm kiếm theo tên/mô tả" onChange={handleSearch} />
              <Button id="addBtn" onClick={showModal}>Thêm</Button>
            </Input.Group>
          </div>
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={data}
              bordered
              pagination={{
                onChange(current) {
                  setPage(current)
                },
                pageSize: pageSize
              }} />
          </div>
          <Modal
            title="Thêm món ăn"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} labelCol={{span:10}} validateMessages={validateMessages} labelAlign="left" onFinish={handleAdd}>
              <Form.Item
                name="name"
                label="Tên món"
                rules={[
                  {
                    required: true,
                  },
                ]}
                hasFeedback
              >
                <Input id="name" />
              </Form.Item>
              <Form.Item
                name="price"
                label="Đơn giá"
                rules={[
                  {
                    required: true,
                  },
                ]}
                hasFeedback
              >
                <Input id="price" />
              </Form.Item>
              <Form.Item
                name="descriptionS"
                label="Mô tả ngắn"
                rules={[
                  {
                    required: true,
                  },
                ]}
                hasFeedback
              >
                <Input.TextArea id="descriptionS" />
              </Form.Item>
              <Form.Item
                name="descriptionF"
                label="Mô tả đầy đủ"
                rules={[
                  {
                    required: true,
                  },
                ]}
                hasFeedback
              >
                <Input.TextArea id="descriptionF" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Thông tin nhà cung cấp"
                rules={[
                  {
                    required: true,
                  },
                ]}
                hasFeedback
              >
                <Input id="address" />
              </Form.Item>
              <Form.Item
                name="imageS"
                label="Ảnh nhỏ"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  showUploadList={{showPreviewIcon: false}}
                >
                  {fileList.length >= 1 ? null : 
                  <div>
                    <PlusOutlined />
                    <div>Upload</div>
                  </div>}
                </Upload>
              </Form.Item>
              <Form.Item
                name="imageB"
                label="Ảnh lớn"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList2}
                  onChange={handleChange2}
                  showUploadList={{showPreviewIcon: false}}
                >
                  {fileList2.length >= 1 ? null : 
                  <div>
                    <PlusOutlined />
                    <div>Upload</div>
                  </div>}
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                <Button type="primary" htmlType="submit">Thêm</Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal 
            title="Chi tiết"
            visible={isDetailVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            footer={[
              <Button key="back" onClick={handleOk}>OK</Button>
            ]}
          >
            <Form labelCol={{span:10}} validateMessages={validateMessages} labelAlign="left">
              <Form.Item
                label="Tên món"
              >
                <div>{tempDetail.name}</div>
              </Form.Item>
              <Form.Item
                label="Đơn giá"
              >
                <div>{tempDetail.price}</div>
              </Form.Item>
              <Form.Item
                label="Mô tả ngắn"
              >
                <div>{tempDetail.descriptionS}</div>
              </Form.Item>
              <Form.Item
                label="Mô tả đầy đủ"
              >
                <div>{tempDetail.descriptionF}</div>
              </Form.Item>
              <Form.Item
                label="Thông tin nhà cung cấp"
              >
                <div>{tempDetail.address}</div>
              </Form.Item>
              <Form.Item
                label="Ảnh nhỏ"
              >
                <Image width={110} height={80} src={tempDetail.imageS} />
              </Form.Item>
              <Form.Item
                label="Ảnh lớn"
              >
                <Image width={110} height={80} src={tempDetail.imageB} />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Manage