import React, { useEffect, useState } from "react";
import "./Collection.scss";
import Products from "../../components/product/Products";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
function Collection() {
  const navigate = useNavigate();
  const params = useParams();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [products, setProducts] = useState();
  const [catagoryId, setCategoryId] = useState();

  // console.log("params is", params);

  // const catagoryList = [
  //   {
  //     id: "comics",
  //     value: "Comics",
  //   },
  //   {
  //     id: "tv-shows",
  //     value: "TV-Shows",
  //   },
  //   {
  //     id: "sports",
  //     value: "sports",
  //   },
  // ];

  const sortOptions = [
    {
      value: "price - Low To High",
      sort: "Price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  async function fetchData() {
    //    const productsData= await axiosClient.get(`/products?populate=Image&filters[category][Key][$eq]=${params.catagoryId}&sort=${sortBy}`)
    //    console.log(" products data for collection", productsData?.data?.data);
  let productResponse = null;
    if (params.catagoryId) {
      productResponse = await axiosClient.get(
        `/products?populate=Image&filters[category][Key][$eq]=${params.catagoryId}&sort=${sortBy}`
      );
    } else {
      productResponse = await axiosClient.get(
        `/products?populate=Image&sort=${sortBy}`
      );
    }
    setProducts(productResponse?.data?.data);
  // console.log("productResponse",productResponse?.data?.data);
   
  }

  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    fetchData();
    setCategoryId(params.catagoryId);
  }, [params]);

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  return (
    <div className="Categories container ">
      <div className="categoriesTop">
        <div className="categoriesTopleft">
          <h1 className="categoriesHeading">Explore All Print And Art Work</h1>
          <p className="categorisTitle">
            India's largest collection of wall poster for your bedroom , living
            room , kids room , kitchen and posters & art prints at high quality
            and low price gauranteed
          </p>
        </div>
        <div className="CategoriesTopRight">
          <div className="sort">
            <div className="sortHeading">Sort By</div>
            <div className="sortCheckBox">
              <select
                className="selectSortBy"
                name="sortBy"
                id="sortBy"
                onChange={handleSortChange}
              >
                {/* <option value="relevance">Relevance</option>
              <option value="newestFirst">Newest First</option>
              <option value="lowToHigh">price - Low To High</option> */}
                {sortOptions.map((item) => {
                  return (
                    <option key={item.sort} value={item.sort}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="categoriesBottom">
        <div className="categoriesBottomLeft">
          <div className="categoriesFilterBox">
            <h3>Catagory</h3>
            {categories.map((item) => {
              return (
                <div key={item.id}>
                  <input
                    name="categoyy"
                    type="radio"
                    value={item.attributes.Key}
                    id={item.id}
                    checked={item.attributes.Key === catagoryId}
                    onChange={updateCategory}
                  />
                  <label htmlFor={item.id}>{item.attributes.Title}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="categoriesBottomRight">
          <div className="categoriesProduct ">
            {products?.map((product) => (
              <Products key={product.id} product={product} id={product.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
