import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(
      "mongodb+srv://hoangnmndm_db_user:oZlU3JtbZrxPN5tv@cluster0.lnqijzc.mongodb.net/quanghuy-nodejs?appName=Cluster0",
    )
    .then(() => {
      console.log("Connect DB successfully!");
    })
    .catch((err) => {
      console.log("Connect DB failed!", err);
    });
}

export default connectDB;
