import React, {useState} from 'react';
import './Cart.sass'
import {useDispatch, useSelector} from 'react-redux'
import {Card} from '../../components/Card'

export const Cart = ({openModal, setOpenModal}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart.cart)

    const [buyAllItems, setBuyAllItems] = useState(false)

    const deleteOneItem = (id) => {
        console.log(id)
        dispatch({type:'REMOVE_ITEM_CART', deleteId: id})
    }

    const buyAll = () => {
        setBuyAllItems(true)
        dispatch({type:'CLEAN_CART'})
    }

    const closeModal = () => {
        setBuyAllItems(false)
        setOpenModal(false)
    }

  return (
    <>
    {openModal && 
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    Seu carrinho
                    <button onClick={() => closeModal()}>x</button>
                </div>
                {
                    cart.length === 0 && buyAllItems !== true ?
                    <div className="emptyCart">
                        <p>Aún no tienes productos en tu carrito</p>
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    :
                    <>
                        <div className="cardItemsContainer">
                            <>
                            {
                                cart?.map(c => (
                                    <div className='cardsItems'>
                                        <img style={{marginRight:'10px'}} width='50px' src={c.picture[0].url} />
                                        <div className='cardsItemsAttributes'>
                                            <p className="titleItemCart">{c.title}</p>
                                            <p className="priceItemCart">$ {c.price.decimals}</p>
                                        </div>
                                        <span className="deleteItem" onClick={() => deleteOneItem(c.deleteId)}><i className="far fa-trash-alt"></i></span>
                                    </div>
                                ))
                            }
                            </>
                        </div>
                            { buyAllItems && 
                                <div  className="emptyCart">
                                    <p>Felicitaciones, ha comprado todos los productos.</p>
                                    <i style={{color:'#bbad0f'}} className="far fa-smile-wink"></i>
                                </div>
                                }
                        {!buyAllItems && <div className="buttonBuyContainer">
                            <button className="buttonBuyAllItems" onClick={() => buyAll()}> Comprar</button>
                        </div>}
                    </>
                }
            </div>
        </div>
    }  
    </> 
  );
}