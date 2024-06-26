const express = require("express");
const initRoutes = require("./routes/initRoutes");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");
require("./config/passport");

// Cấu hình các tệp tĩnh từ thư mục uploads
app.use(express.static("uploads/images"));

const PORT = process.env.PORT || 3001;
const HOST_NAME = process.env.HOST_NAME || "localhost";
const URL_FRONTEND = process.env.URL_FRONTEND;

// Cấu hình CORS middleware
app.use(
  cors({
    origin: { URL_FRONTEND },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Cho phép chia sẻ cookie và thông tin xác thực qua các miền khác nhau
    optionsSuccessStatus: 204, // Cho phép trả về status code 204 khi pre-flight request thành công
  })
);

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config cookie parser
app.use(cookieParser());

// config routes
initRoutes(app);

// config database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on: http://${HOST_NAME}:${PORT}`);
});
