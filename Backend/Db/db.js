const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectToMongo = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToMongo;
