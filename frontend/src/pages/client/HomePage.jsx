import { useQuery } from "@tanstack/react-query";
import { productAPI } from "../../api/productAPI";

const HomePage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: productAPI.getAll,
  });

  console.log(data.data.data);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.data.data.map((item) => (
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
