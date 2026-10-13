import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";
import connectDB from "./src/config/db.config.js";
import { errorHandler } from "./src/shared/middlewares/errorHandler.js";
import { envConfig } from "./src/config/env.config.js";
const app = express();

app.use(
  cors({
    // origin: "http://localhost:5173",
  }),
);
app.use(express.json());

connectDB();

app.use("/api", routes);

app.use(errorHandler);

app.listen(envConfig.PORT, (err) => {
  if (err) {
    console.log(`Start server failed: ${err.message}`);
  }
  console.log(`Server is running on port: ${envConfig.PORT}`);
});
