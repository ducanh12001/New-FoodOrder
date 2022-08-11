import React from 'react'
import './style.css'
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';

function SharedLayout() {
  return (
    <div>
      <header>
        <div class="left_area">
          <Link to="/" className="logo">FoodOrder</Link>
        </div>
        <div class="right_area">
          <div class="item">
            <Link to="" className="a-tag">
              <ShoppingCartOutlined className="cart-icon" />
              <div class="dish-num">
                <span class="num">0</span>
              </div>
            </Link>
          </div>
          <div class="item">
            <Link to="/manage" className="a-tag">Manage</Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

export default SharedLayout