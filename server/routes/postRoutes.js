const express = require("express");
const router = express.Router();
const Posts = require("../controllers/postController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

router.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: "deouthvnb",
  api_key: "495399532625234",
  api_secret: "a51UagGeZp9CZSW3Ke9-YJ-wBHE",
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-posts",
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage: storage });

// Apply authentication middleware to all routes in this router
// router.use(auth);

router.get("/getPosts", Posts.getAllPosts);
router.get("/getPostsById/:id", auth, Posts.getPostsById);
router.get("/getPostById/:id", Posts.getPostById);
router.post("/createPost", upload.single("image"), auth, Posts.createPost);
router.patch("/updatePost/:id", auth, Posts.updatePost);
router.delete("/deletePost/:id", auth, Posts.deletePost);

module.exports = router;
