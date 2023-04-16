import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import comicBookRoutes from "./routes/comicBookRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.Promise = global.Promise;
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/comicStore";
mongoose
  .connect(mongoUri, {})
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit();
  });
const app = express();

// Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware
const corsOptions = {
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// Cookie parser middleware
app.use(cookieParser());

// Routes
app.use("/", userRoutes);
app.use("/", comicBookRoutes);

// Trust proxy
app.set("trust proxy", true);

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
