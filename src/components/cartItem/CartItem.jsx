import React from 'react'
import dummyImg from '../../assets/ProductDetail.jpg'
import './CartItem.scss';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

function CartItem({cartItem}) {
  const dispatch = useDispatch();
    const currValue = 1;
  return (
    <div className='CartItem'>
       <div className="cartItemLeft">
           <div className="imgContent">
            <img className='cartItemImg' src={cartItem?.Image} alt="cart product img" />
            </div>
        
       </div>
       <div className="cartItemRight">
        <h4 className='cartItemTitle'> {cartItem?.Title} </h4>
        <h5 className='cartItemPrice'>₹ {cartItem?.Price}</h5>
        <div className="cartItemPriceChanger">
                  <div className="decrement commen" onClick={()=>dispatch(removeFromCart(cartItem))}>
                    -
                  </div>
                  <div className="currValue commen">{cartItem?.quantity}</div>
                  <div className="increment commen"onClick={()=>dispatch(addToCart(cartItem))}>
                    +
                  </div>
              </div>
              <h3 className='cartItemSubTotal'> SUBTOTAL : ₹ {cartItem.quantity * cartItem.Price} </h3>
                                                                             
       </div>

    </div>
  )
}

export default CartItem