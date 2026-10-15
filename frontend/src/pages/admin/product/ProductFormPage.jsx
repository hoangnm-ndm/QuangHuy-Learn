import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { productAPI } from "../../../../api/productAPI";
import { useCRUD } from "../../../hooks/useCRUD";
import { zodResolver } from "../../../../node_modules/@hookform/resolvers/zod/src/zod";
import { productSchema } from "../../../shared/validation/productSchema";

const ProductFormPage = () => {
  const { create, update, fetchById } = useCRUD(productAPI);
  const { id } = useParams();
  const nav = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (payload) => {
    // event.preventDefault();
    // const formData = new FormData(event.target);
    // const dataForm = Object.fromEntries(formData);

    id ? await update(id, payload) : await create(payload);
    nav("/admin/san-pham");
  };

  useEffect(() => {
    (async () => {
      const data = await fetchById(id);
      reset(data);
    })();
  }, [id]);

  return (
    <div>
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors?.title && (
            <span style={{ color: "red" }}>{errors.title.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true, required: true })}
          />
          {errors?.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="">Description</label>
          <textarea
            placeholder="Description"
            {...register("description")}
          ></textarea>
          {errors?.description && (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          )}
        </div>
        <div className="form-group">
          <button>{id ? "Update" : "Add"}</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
