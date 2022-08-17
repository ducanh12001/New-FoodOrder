import React, { useEffect, useState } from 'react'
import { getTypeStore, loadDish, loadTypeDish } from './MainFunction'
import { Image } from 'antd'
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
    <div className="content-container">
      <div className="card-container">
        {
          data.map(type => {
            return (
              <div className="type-card" key={type.id}>
                <Link className="type-link" to={`/${type.id}`}>
                  <Image width="100%" height={200} preview={false} src={type.image} />
                  <span>{type.name}</span>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home