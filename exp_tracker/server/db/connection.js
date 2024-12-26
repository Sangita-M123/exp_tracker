const mongoose = require("mongoose");
var mongoURL =
  "mongodb+srv://chatbot:AI@cluster0.9crdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURL)

  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = mongoose;