import React from "react";
import "./Category.scss";
import { useNavigate } from "react-router-dom";
function Category({ category }) {
  // console.log('category', category);
  // console.log('category',category.attributes.Image.data[0].attributes.url);

  const navigate = useNavigate();

  return (
    <div
      className="Category"
      style={{
        backgroundImage: `url(${category?.attributes?.Image?.data[0]?.attributes?.url})`,
        aspectRatio: 15/9,
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      onClick={() => navigate(`/category/${category.attributes.Key}`)}
    >
      <div className="catagoryContent center">
        <h3 className="catagoryHeading">{category.attributes.Title}</h3>
      </div>
    </div>
  );
}

export default Category;
