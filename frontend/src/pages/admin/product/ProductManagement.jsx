import { Link } from "react-router";
import { useProducts } from "../../../hooks/useProducts";

const ProductManagement = () => {
  const { products, loading, error, removeProduct } = useProducts();

  if (loading)
    return (
      <>
        <p>Loading...</p>
      </>
    );

  if (error)
    return (
      <>
        <p>{error}</p>
      </>
    );

  return (
    <>
      <h1>Product Management</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length !== 0 &&
            products.map((item) => (
              <tr className="product-row" key={item._id}>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`update/${item._id}`}>Update</Link>{" "}
                  <button
                    disabled={loading}
                    onClick={() => removeProduct(item._id)}
                  >
                    Archive
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductManagement;
