import { productAPI } from "../../../api/productAPI";
import { useCRUD } from "../../hooks/useCRUD";
import { cartStore } from "../../store/cartStore";

const HomePage = () => {
  const { data } = useCRUD(productAPI);
  const { cart, addToCart, resetCart } = cartStore();
  console.log(cart);
  return (
    <div>
      {data.map((item) => (
        <div className="product-card" key={item._id}>
          <img src={item.thumbnail} alt={item.title} />
          <div className="product-infor">
            <h2>{item.title}</h2>
            <div>Giá: {item.price}</div>
            <p>Mô tả: {item.description}</p>
            <button onClick={() => addToCart(item)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
