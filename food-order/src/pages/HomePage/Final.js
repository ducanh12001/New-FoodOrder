import { CheckCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'

function Final() {
  return (
    <div className="final-container">
      <CheckCircleOutlined style={{color: 'green', fontSize: 50,}} />
      <div className="final-text">Thanh toán thành công!</div>
      <Link className="final-link" to="/">Tiếp tục mua</Link>
    </div>
  )
}

export default Final