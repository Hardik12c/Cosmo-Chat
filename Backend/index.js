require("dotenv").config();
const connectToMongo = require("./Db/db");
const express = require("express");
const auth = require("./routes/auth");
var cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", auth);

const start = async () => {
  try {
    await connectToMongo(process.env.connectionstring);
    app.listen(port, () =>
      console.log(`app listening on port http://localhost:${port}/`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
