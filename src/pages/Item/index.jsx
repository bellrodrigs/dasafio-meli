import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {SearchBar} from '../../components/SearchBar'
import './Item.sass'
import styled from 'styled-components'
import {useDispatch, useSelector } from 'react-redux'


export const Item = () => {

  const dispatch = useDispatch()

  const [mainPicture, setMainPicture] = useState()
  const [picId, setPicId] = useState()


  const location = useLocation();

  const item = location?.state?.data

  const setImage = (pic) => {
    setMainPicture(pic.url)
    setPicId(pic.id)
  }

  const addItemInCart = (item) => {
    dispatch({type:'ADD_ITEM', data: item})
  }


  return (
    <div className="searchContainer">
      <SearchBar />
    {
      item === undefined ? <p style={{textAlign:'center'}}>Es necesario hacer una búsqueda</p> :
    <div className="itemContainer">
      <div className="itemContent">
        <div className='imgItemContent'>
          <div className="imgCards">
            {
              item?.picture?.map(pic => (
                <Image focus={pic.id === picId} className="cardsImg" onClick={() => setImage(pic)} width="50px" src={pic.url} />
              ))
            }
          </div>
            <img className='imgItem' src={mainPicture || item?.picture[0]?.url} />
        </div>
        <div>
          <p className="conditionNSold">{item?.condition} - {item?.sold_quantity}</p>
          <p className="itemTitle">{item?.title}</p>
          <p className="itemPrice">$ {item?.price?.decimals}</p>
          <div className="buttonsContainer">
            <button className="buyButton" onClick={() => alert(`Felicitaciones compraste el producto ${item.title}  por ${item.price.decimals}`)}>Comprar ahora</button>
            <button onClick={() => addItemInCart(item)} className="addCartButton">Agregar al carrito</button>

          </div>
        </div>
      </div>
        <div>
          <h3>Descripción</h3>
          <p>{item?.description}</p>
        </div>
    </div>
          }
  </div>
  );
}

const Image = styled.img`
  border: ${({focus}) => focus ? '2px solid #3483fa' : null}
`