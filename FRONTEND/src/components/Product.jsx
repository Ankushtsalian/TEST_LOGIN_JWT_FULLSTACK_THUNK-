import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../Redux";

const Product = () => {
  const { productList } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleDelete = async (e, id, publicId) => {
    e.preventDefault();

    dispatch(deleteProduct({ id, publicId }));
    dispatch(getAllProducts());
  };
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
              DELETE
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Product;
