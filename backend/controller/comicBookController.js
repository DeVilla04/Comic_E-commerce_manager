import comicBook from "../model/comicBook.js";

const createComicBook = async (req, res) => {
  const { title, author, yearPublished, price, discount, numPages, condition } =
    req.body;
  try {
    const newComicBook = new comicBook({
      title: title,
      author: author,
      yearPublished: yearPublished,
      price: price,
      discount: discount,
      numPages: numPages,
      condition: condition,
    });
    const savedComicBook = await newComicBook.save();
    return res.status(201).json({
      message: "Comic Book created",
      content: {
        id: savedComicBook.id,
        title: savedComicBook.title,
        author: savedComicBook.author,
        yearPublished: savedComicBook.yearPublished,
        price: savedComicBook.price,
        discount: savedComicBook.discount,
        numPages: savedComicBook.numPages,
        condition: savedComicBook.condition,
        createdAt: savedComicBook.createdAt,
        updatedAt: savedComicBook.updatedAt,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getAllComic = async (req, res) => {
  try {
    const comicBooks = await comicBook.find({});
    return res.status(200).json({
      message: "Comic Books retrieved",
      content: comicBooks,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getComicBook = async (req, res) => {
  const { id } = req.params;
  try {
    const comic = await comicBook.findById(id);
    if (comic) {
      return res.status(200).json({
        message: "Comic Book retrieved",
        content: comic,
      });
    }
    return res.status(404).json({ message: "Comic Book not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateComicBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, yearPublished, price, discount, numPages, condition } =
    req.body;
  try {
    const findComic = await comicBook.findById(id);
    if (findComic) {
      if (title) {
        findComic.title = title;
      }
      if (author) {
        findComic.author = author;
      }
      if (yearPublished) {
        findComic.yearPublished = yearPublished;
      }
      if (price) {
        findComic.price = price;
      }
      if (discount) {
        findComic.discount = discount;
      }
      if (numPages) {
        findComic.numPages = numPages;
      }
      if (condition) {
        findComic.condition = condition;
      }
    }
    const updatedComic = await findComic.save();
    return res.status(200).json({
      message: "Comic Book updated",
      content: updatedComic,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteComicBook = async (req, res) => {
  const { id } = req.params;
  try {
    const comic = await comicBook.findById(id);
    if (comic) {
      await comic.deleteOne();
      return res.status(200).json({ message: "Comic Book deleted" });
    }
    return res.status(404).json({ message: "Comic Book not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createComicBook,
  getAllComic,
  getComicBook,
  updateComicBook,
  deleteComicBook,
};
