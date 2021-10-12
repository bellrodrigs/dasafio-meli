const INITIAL_STATE = {
    cart:[],
};

     
    export default function pokemons(state = INITIAL_STATE, action){
        console.log('state ', state)
     switch(action.type){
      case 'ADD_ITEM':
      return { ...state, cart:[ ...state.cart, action.data]}
      case 'CLEAN_CART':
        return { ...state, cart:[]}
      case 'REMOVE_ITEM_CART':
      return { ...state, cart:[ ...state.cart.filter(item => item.deleteId !== action.deleteId )]}
      default:
        return state
      
    }
  }