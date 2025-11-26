import "dotenv/config";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { app } from "./app";
import { configureMongoose } from "./infrastructure/db/mongoose.config";

configureMongoose();

const start = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

start();
