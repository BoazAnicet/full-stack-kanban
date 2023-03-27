const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// const postRoutes = require("./routes/postRoutes");
const boardRoutes = require("./routes/boardRoutes");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
// const { errorHandler } = require("./middleware/errorMiddleware");

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
// app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/boards", boardRoutes);

// app.use(errorHandler);

const PORT = process.env.PORT || 3001;
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database.");
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  }
);
