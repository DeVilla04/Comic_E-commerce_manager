import { Router } from "express";
import { authentication, isAdmin } from "../middleware/authentication.js";
import {
  createComicBook,
  getComicBook,
  getAllComic,
  updateComicBook,
  deleteComicBook,
} from "../controller/comicBookController.js";
const router = Router();

router.post("/create", authentication, isAdmin, createComicBook);
router.get("/all", getAllComic);
router.get("/:id", getComicBook);
router.put("/:id", authentication, isAdmin, updateComicBook);
router.delete("/:id", authentication, isAdmin, deleteComicBook);

export default router;
