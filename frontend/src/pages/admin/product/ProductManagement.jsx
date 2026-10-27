import { Link } from "react-router";
import { productAPI } from "../../../api/productAPI";
import { useCRUD } from "../../../hooks/useCRUD";

const ProductManagement = () => {
  const { data, loading, error, remove } = useCRUD(productAPI);

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <h1>Product Management</h1>
        <Link to="add">Add new</Link>
      </div>
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
          {data.length !== 0 &&
            data.map((item) => (
              <tr className="product-row" key={item._id}>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`update/${item._id}`}>Update</Link>{" "}
                  <button disabled={loading} onClick={() => remove(item._id)}>
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
