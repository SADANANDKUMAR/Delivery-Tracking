const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const bodyParser = require("body-parser");

const updateLocations = require("./src/routes/locations");
const orderDetails = require("./src/routes/order_details");
const getorderdetails = require("./src/routes/get_order_details");
const deleteorderdetails = require("./src/routes/delete_order_details");

const PORT = 3000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`App listening on port ===> http://localhost:${PORT}/`);
});
app.use(bodyParser.json());

app.use("/orderdetails", orderDetails);
app.use("/updatelocations", updateLocations);
app.use("/getorderdetails", getorderdetails);
app.use("/deleteorderdetails", deleteorderdetails);
app.get("/", (req, res) =>
  res.sendFile(__dirname + "/src/constants/success.html")
);
app.all("*", (req, res) =>
  res.sendFile(__dirname + "/src/constants/404_error.html")
);
