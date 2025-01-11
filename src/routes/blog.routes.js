import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
    deleteBlog,
    getAllBlogs,
    getBlogById,
    publishABlog,
    updateBlog,
} from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllBlogs)
    .post(
        upload.single("image"),
        publishABlog
    );

router
    .route("/b/:blogId")
    .get(getBlogById)
    .delete(deleteBlog)
    .patch(
        upload.single("image"),
        updateBlog
    );

export default router;
