const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const driverRoutes = require("./routes/driver.js");
const vehicleRoutes = require("./routes/vehicle.js");
const orderRoutes = require("./routes/order.js");
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({extended: "true" }));
app.use(bodyParser.urlencoded({extended: "true" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });
// app.get("/api/:id", (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   let resultChat = null;
//   chats.map((chat) => {
//     if (chat._id == id) {
//       resultChat = chat;
//     }
//   });
//   res.send(resultChat);
// });

// app.listen(PORT, () => {
//   console.log(`server is running in port ${PORT}`);
// });
app.use('/api/drivers',driverRoutes);
app.use('/api/vehicles',vehicleRoutes);
app.use('/api/orders',orderRoutes);

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
