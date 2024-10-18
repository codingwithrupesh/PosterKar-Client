import React, { useEffect, useState } from "react";
import "./Home.scss";
import Hero from "../../components/hero/Hero";
import Category from "../../components/category/Category";
import Products from "../../components/product/Products";
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";
function Home() {
  // const [categories , setCategories] = useState(null);
  const categories = useSelector(state=>state.categoryReducer.categories); 


  const [topProducts, setTopProducts] =useState( null);
async function fetchData(){
  try {
    // const  categoriesRespons = await axiosClient.get('/categories?populate=Image');
  const topPicksRespons = await axiosClient.get('/products?filters[isTopPick][$eq]=true&populate=Image');
  // console.log(" Categories respons from Strapie server",categoriesRespons);
  // console.log(" Top Picks respons from Strapie server",topPicks);
  // setCategories(categoriesRespons.data.data);
  setTopProducts(topPicksRespons.data.data);
  } catch (error) {
    //  console.log("error is" , error);
  }
  

}

 useEffect(()=>{
fetchData();
 },[]);
  

  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading"> Shope by Categories</h2>
          <p className="subheading">
            {" "}
            Shope from the best , our File and TV Posters Collections.
          </p>
        </div>

        <div className="content">
         {categories?.map(category=>
          <Category key ={category.id} category = {category}/>
         )}
        </div>
      </section>

      <section className="collection container">
        <div className="info">
          <h2 className="heading"> Our top picks</h2>
          <p className="subheading">All new design , same old details</p>
        </div>

        <div className="content">
         {topProducts?.map(product =>
          <Products className= "contentChild" key={product.id} product = {product}/>
         )}
        </div>
      </section>
      

    </div>
  );
}

export default Home;
