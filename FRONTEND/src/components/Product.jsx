import React from "react";

const Product = ({ productList, handleDelete }) => {
  return (
    <>
      {productList.map((product) => {
        const { name, price, image, _id, public_id } = product;
        return (
          <div key={_id} className="product-container">
            <div style={{ alignContent: "left" }}>
              <p>name: {name}</p>
              <p>price: {price}</p>
              <p>Image: {public_id}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img className="product-img" src={image} />
              </div>
            </div>
            <button
              className="control "
              onClick={(e) => handleDelete(e, _id, public_id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Product;
