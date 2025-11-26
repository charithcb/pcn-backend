import mongoose from "mongoose";

export const configureMongoose = () => {
  mongoose.set("strictQuery", false);
};
