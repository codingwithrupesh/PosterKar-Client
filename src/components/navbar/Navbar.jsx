import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import { BsCartDash } from "react-icons/bs";
import SideCart from '../../pages/sideCart/SideCart';
import { useSelector } from 'react-redux';

function Navbar() {
  const [isCartActive , setIsCartActive] = useState();
 const categories = useSelector(state=>state.categoryReducer.categories); 
 const cart = useSelector(state => state.cartReducer.cart);
let totalItem = 0;
cart.forEach(item => {
  totalItem += item.quantity;
  
});

//  console.log("store category reducer",categories);

  return (
    <div className='Navbar'>
      <div className='container nav-container'>
       <div className='nav-left'>
      <ul className='link-group' >
     {
      categories?.map((category)=>{
        return(
      <li className='hover-link' key={category.id} > <Link className='link' to = {`/category/${category?.attributes?.Key}`}>{category?.attributes?.Title}</Link>  </li>
        )
      })

     }

      {/* <li className='hover-link'> <Link className='link' to = "category/comics">Comic</Link>  </li> */}
      {/* <li className='hover-link'> <Link className='link' to = "category/tv-shows">TV Shows</Link>  </li> */}
      {/* <li className='hover-link'> <Link className='link' to = "category/sports">Sports</Link>  </li> */}

      
      </ul>
       </div>
       <div className='nav-center'><Link to = "/"><h1 className='banner'>Posterz.</h1></Link>  </div>
       <div className='nav-right'>
         <div className='nav-cart hover-link ' onClick={() => setIsCartActive(!isCartActive)}> 
         <BsCartDash className='icon'  />
           {(totalItem > 0)&& <span className='cart-count center '>{totalItem}</span>}
         </div>
       </div>
      </div>
     { isCartActive &&<SideCart onClose = {()=> setIsCartActive(false)}/> }
    </div>
  )
}

export default Navbar