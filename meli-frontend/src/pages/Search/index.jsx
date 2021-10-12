import React, {useState, useEffect} from 'react';
import {SearchBar} from '../../components/SearchBar'
import {Card} from '../../components/Card'
import { useLocation } from 'react-router-dom';

import './Search.sass'

export const Search = () => {

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [inputPage, setInputPage] = useState(page)

  const location = useLocation();

  const items = location?.state?.data
  const query = location?.state?.query

  useEffect(() => {
    setInputPage(page)
  },[page])
  
  return (
      <div className="searchContainer">
        <SearchBar page={page} query={query} />
          {
            items === undefined ? <p data-testid="noItems" style={{textAlign:'center'}}>Es necesario hacer una búsqueda</p> :
        <div className="cardsContainer">
          {
             items?.map(item => (
              <div key={item?.item?.id}>
                <Card item={item?.item} />
              </div>
             ))
          }
        </div>
          }
          <div className="paginationContainer">
            <button className="paginationButton" disabled={page === 1} onClick={() => setPage(page-1)}><i className="fas fa-chevron-left"></i> </button>
            <p>{page}</p>
            {/* <input className="paginationInput" type="number" onChange={(ev) => setPage(ev?.target?.value)} defaultValue={page+1} /> */}
            <button className="paginationButton" onClick={() => setPage(page + 1)}> <i className="fas fa-chevron-right"></i> </button>
          </div>
      </div>
  );
}