import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { Badge, Switch, Avatar, Dropdown, Menu, Space } from 'antd'
import { Link, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { DownOutlined, HistoryOutlined, LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useTheme } from '../../theme/use-theme'
import AuthContext from '../../Auth/AuthContext';
import { resetStore, updateNumCart } from './MainFunction';

function SharedLayout() {
  let navigate = useNavigate();
  const [numCart, setNumCart] = useState(localStorage.getItem('numInCart'))
  const [isLogin, setIsLogin] = useState(false)
  const [isDarkMode, setIsDarkMode] = useTheme()
  const [currentUser, setCurrentUser] = useContext(AuthContext)

  const logout = () => {
    setCurrentUser(null);
    resetStore()
    updateNumCart(setNumCart)
    navigate('/');
  }

  const menu = (
    <Menu items={[
      {
        key: '1',
        label: (
          <Link to=""><HistoryOutlined className="menu-icon" />Lịch sử đơn hàng</Link>
        ),
      },
      {
        key: '2',
        label: (
          <a onClick={logout}><LogoutOutlined className="menu-icon" />Đăng xuất</a>
        ),
      },
    ]}
    />
  )

  return (
    <div>
      <header>
        <div className="left_area">
          <Link to="/" className="logo">FoodOrder</Link>
        </div>
        <div className="right_area">
          <div className="item">
            <Switch checked={isDarkMode} onChange={setIsDarkMode} checkedChildren="Light" unCheckedChildren="Dark" defaultChecked />
          </div>
          <div className="item">
            <Link to="/cart" className="a-tag">
              <Badge size="small" count={numCart}>
                <ShoppingCartOutlined className="cart-icon" />
              </Badge>
            </Link>
          </div>
          <div className="item">
            <Link to="/manage" className="a-tag">Manage</Link>
          </div>
          {currentUser ?
            <div className="item">
              <Dropdown overlay={menu}>
                <Space className="dropdown">
                  <Avatar src={require('../../images/user.jpg')} />
                  <span className="username">{currentUser.fullname}</span>
                </Space>
              </Dropdown>
            </div>
            :
            <div className="item">
              <Link to="/login" className="a-tag">Đăng nhập</Link>
            </div>
          }
        </div>
      </header>
      <Outlet context={[numCart, setNumCart]} />
    </div>
  )
}

export default SharedLayout