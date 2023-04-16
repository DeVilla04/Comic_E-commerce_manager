import mongoose from "mongoose";
const Schema = mongoose.Schema;

const comicBookSchema = new Schema(
  {
    title: String,
    author: String,
    yearPublished: Number,
    price: Number,
    discount: Number,
    numPages: Number,
    condition: String,
  },
  { timestamps: true }
);

export default mongoose.model("ComicBook", comicBookSchema);
