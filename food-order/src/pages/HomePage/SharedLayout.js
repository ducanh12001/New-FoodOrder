import React, { useEffect, useState } from 'react'
import './style.css'
import { Switch } from 'antd'
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useTheme } from '../../theme/use-theme'

function SharedLayout() {
  const [isDarkMode, setIsDarkMode] = useTheme()
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
              <ShoppingCartOutlined className="cart-icon" />
              <div className="dish-num">
                <span className="num">0</span>
              </div>
            </Link>
          </div>
          <div className="item">
            <Link to="/manage" className="a-tag">Manage</Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

export default SharedLayout