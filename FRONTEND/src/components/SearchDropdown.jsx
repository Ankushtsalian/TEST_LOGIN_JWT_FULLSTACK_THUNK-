import { useSelector } from "react-redux";
let filteredProducts;
const SearchDropdown = () => {
  let { productList, search } = useSelector((state) => state.product);

  filteredProducts = productList.filter((product) =>
    product.name.includes(search)
  );

  return (
    <div className="search-dropdown-container">
      {filteredProducts.length ? (
        filteredProducts.map((product, i) => {
          const { name, price, image, _id, public_id } = product;
          if (name) {
            return (
              <div className="search-dropdown" key={_id}>
                <div className="search-dropdown-info">
                  <p> {name}</p>
                  <p>{price} $</p>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className="search-dropdown">
          <div className="search-dropdown-info">No Products Found </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
