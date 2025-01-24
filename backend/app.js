const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const boardRoutes = require("./routes/boardRoutes");
const templateRoutes = require("./routes/templateRoutes");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    limit: "1mb",
    extended: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/boards", boardRoutes);
app.use("/api/v1/templates", templateRoutes);

app.use(mongoSanitize());

const PORT = process.env.PORT || 3001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database.");
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((error) => console.error(error));
