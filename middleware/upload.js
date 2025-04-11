const multer = require("multer");
const path = require("path");

// Destination and filename config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 171345691.jpg
  },
});

const upload = multer({ storage });

module.exports = upload;
