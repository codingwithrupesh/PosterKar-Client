import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import {loadStripe} from '@stripe/stripe-js';
import CartItem from "../../components/cartItem/CartItem";
import "./SideCart.scss";
import { useSelector } from "react-redux";
 import {axiosClient} from '../../utils/axiosClient'
function SideCart({ onClose }) {
  

  const cart = useSelector((state) => state.cartReducer.cart);
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.quantity * item.Price;
  });
  const isCartEmpty = cart.length === 0;

  

  

  async function handleCheckOutbuton() {
    try {
        const response = await axiosClient.post('/orders', {
            products: cart
          });

        const stripe = await loadStripe(`${import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY}`);
        
        const data = await stripe.redirectToCheckout({
            sessionId: response.data.stripeId
        })

       console.log('stripe data', data);

    } catch (error) {
        console.log(error);
    }
    
}



  return (
    <div className="SideCart">
      <div className="overlay" onClick={onClose}></div>
      <div className="sideCartContent">
        <div className="sideCartHeading">
          <h3>Shopping Cart</h3>
          <div onClick={onClose}>
            <IoIosCloseCircleOutline className="closeBtn" />
          </div>
        </div>
        <div className="cartItem">
          {cart.map((cartItem) => {
            return <CartItem key={cartItem.Key} cartItem={cartItem} />;
          })}
        </div>
        {isCartEmpty && (
          <div className="cartEmpty">
            <div className="cartEmptyIcon">
              <BsCart3 />
            </div>
            <h4>Cart is Empty </h4>
          </div>
        )}

        {!isCartEmpty && (
          <>
            <div className="totalPrice">
              <h2>TOTAL:</h2>
              <h2>₹{totalPrice}</h2>
            </div>

            <div className="checkOutBtn">
              <button className="primary-btn" onClick={handleCheckOutbuton}>
                CHECKOUT NOW
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SideCart;
