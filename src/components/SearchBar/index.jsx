import React, {useState, useEffect} from 'react';
import './SearchBar.sass';
import { useHistory } from 'react-router-dom';
import {Loading} from '../Loading'
import {Cart} from '../Cart'
import {useDispatch, useSelector} from 'react-redux'


export const SearchBar = ({page, query}) => {

  const cart = useSelector(state => state.cart.cart)

  const [valueInput, setValueInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [queryLocal, setQueryLocal] = useState(query)
  const [openModal, setOpenModal] = useState(false)

  const history = useHistory()

  useEffect(() => {
    // if(page === 1) return
    findItems(queryLocal)
  },[page])

  
  const findItems = (query) => {
      if(valueInput === '' && query === undefined) {
        return
      }
      setLoading(true)
        fetch(`http://localhost:8080/search/${query || valueInput}&${page-1 || 0}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          return response.json();
        }).then(data => {
          console.log('data ',data)
          setLoading(false)
          history.push({
            pathname: '/items',
            search: `?search=${valueInput ==='' ? query : valueInput}`,  
            state: { 
              data: data,
              query: valueInput
            },
          });
        }).catch(e => {
          console.log(e)
        })
    }

  return (
    <>
      <div className="container">
          <div className="imageContainer">
            <img className="brand" onClick={() => history.push({pathname: '/'})} src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.16.2/mercadolibre/logo__large_plus.png" />
          </div>
          <div className="inputsContainer">
            <input data-testid="inputSearch" onChange={(ev) => setValueInput(ev.target.value)} className="searchInput" type="text" placeholder="Buscar" />
            <button data-testid="buttonSearch" onClick={() => findItems(undefined)} className="searchButton"><i className="fas fa-search" /></button>
          </div>
          <button className="openCartButton" onClick={() => setOpenModal(!openModal)}><i className="fas fa-shopping-cart" />{cart.length !== 0 && <span>{cart.length}</span>}</button>
      </div>
      <Cart openModal={openModal} setOpenModal={setOpenModal} />
      <div className="loading">
        {loading && <Loading  /> }
      </div>
      </>
  );
}

