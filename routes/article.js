const express = require("express");
const router = express.Router();
const multer = require("multer");


const ArticleController = require("../controllers/article")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/articles/");
    },
    filename: (req, file, cb) => {
        cb(null, `article-${Date.now()}-${file.originalname}`);
    }
});

const uploads = multer({ storage });

// Testing Routes
router.get("/testing-route", ArticleController.test);
router.get("/user", ArticleController.user);

// Actual Routes
router.post("/create", ArticleController.create);
router.get("/list/:last?", ArticleController.list);
router.get("/article/:id", ArticleController.listOne);
router.delete("/delete/:id", ArticleController.deleter);
router.put("/update/:id", ArticleController.update);
router.post("/upload-image/:id", [uploads.single("file0")], ArticleController.upload);
router.get("/get-image/:image", ArticleController.image);
router.get("/search/:string", ArticleController.search);

module.exports = router;