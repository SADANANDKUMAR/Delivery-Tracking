const knex = require("knex");
const knexas = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "deepuser",
    password: "@Legion1729",
    database: "traker",
  },
});

//Secret token
var TOKEN_SECRET =
  "hcjsdbshhsbdcjbsjjbsbbdibjnssxjudqwnanjnxjsjxcceuhfbdsqklhgyxrdrxsx";

// Function for creating order in database
const getOrderDetails = async (req, res) => {
  const { order_id } = req.params;
  let response = { status: "", message: "", data: {} };

  const token = req.headers.authorization.split(" ")[1];

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (
      !req.headers.authorization ||
      req.headers.authorization.split(" ").length < 2 ||
      token != TOKEN_SECRET
    ) {
      response.status = 400;
      response.success = false;
      response.message = "Token do not exist or do not match!";
      return res.status(400).json(response);
    } else {
      console.log("good to go");
    }
    const result = await knexas
      .select("*")
      .where({ order_id: order_id })
      .from("orders");
    console.log("====", result);
    if (result) {
      response.status = "success";
      response.data = result;
    }
  } catch (error) {
    console.log(error);
    response.status = "fail";
    response.message = error;
  }
  res.send(response);
};

module.exports = getOrderDetails;
