import React, { useEffect, useState } from 'react'
import { getTypeStore, loadDish, loadTypeDish } from './MainFunction'
import { Image, List, Divider } from 'antd'
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);

  const render = () => {
    let types = getTypeStore();
    setData(types)
  }

  useEffect(() => {
    loadTypeDish();
    loadDish();
    render()
  }, [])

  return (
    <div className="type-container">
      <div className="title"><span>Danh mục đồ ăn</span></div>
      <List
        grid={{
          gutter: 30,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3
        }}
        dataSource={data}
        renderItem={type => {
          return (
            <List.Item>
              <Link className="type-link" to={`/${type.id}`}>
                <Image className="type-image" width="100%" preview={false} src={type.image} />
                <span>{type.name}</span>
              </Link>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default Home