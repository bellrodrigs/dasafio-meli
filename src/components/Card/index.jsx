import React from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


import './Card.sass'

export const Card = ({item}) => {

  const history = useHistory()


  const getItem = (id) => {
    fetch(`http://localhost:8080/item/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
        return response.json();
    }).then(data => {
      data.item.deleteId = uuidv4()
      history.push({
        pathname: '/item',
        search: `?search=${id}`,
        state: {
          data: data?.item
        },
      });
    })
  }

  return (
      <div className="card" onClick={() => getItem(item?.id)}>
          <div className="imageContainer">
            <img data-testid="cardImage" className="image" src={item?.picture} />
          </div>
          <div className='contentContainer'>
            <div className="atributtes">
              <p className="price">$ {item?.price?.decimals}</p>
              <p className="title">{item?.title}</p>
            </div>
            {/* <div>
              estado
            </div> */}
          </div>
      </div>
  );
}
