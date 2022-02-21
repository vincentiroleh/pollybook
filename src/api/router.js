const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const userRoute = require("../controllers/userController");
const verifyUser = require("../verifyUser/verifyUser");

const fileService = require("./convert");

router.post("/upload", upload.single("file"), fileService.convert);
router.post("/api/v1/create", userRoute.createUser);
router.post("/api/v1/login", verifyUser, userRoute.login);

module.exports = router;
