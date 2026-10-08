import express from "express";
import routes from "./src/routes/index.js";

import connectDB from "./src/config/db.config.js";
import { errorHandler } from "./src/shared/middlewares/errorHandler.js";
const app = express();

connectDB();

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server dang chay tren cong 3000");
});
