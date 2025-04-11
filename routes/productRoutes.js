const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");

// Define routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.post("/",upload.single("image"), productController.createProduct);
router.put("/:id",upload.single("image"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
