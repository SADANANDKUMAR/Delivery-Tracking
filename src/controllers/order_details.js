const knex = require("knex");

const knexas = knex({
  client: "mysql2",
  pool: {
    min: 0,
    max: 20,
  },
  connection: {
    host: "localhost",
    port: 3306,
    user: "deepuser",
    password: "@Legion1729",
    database: "traker",
  },
  acquireConnectionTimeout: 10000,
});

var TOKEN_SECRET =
  "hcjsdbshhsbdcjbsjjbsbbdibjnssxjudqwnanjnxjsjxcceuhfbdsqklhgyxrdrxsx";

// Function for creating order in database
const createOrder = async (req, res) => {
  const {
    order_id,
    order_details,
    deleviery_boy_details,
    destination_address,
    source_address,
    destination_latlong,
    total_quantity,
    total_price,
  } = req.body;
  let response = { status: "", message: "", data: {} };

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

    //const connection = await knexas.client.acquireConnection();
    const value = await knexas
      .insert({
        order_id: order_id,
        order_details: order_details,
        deleviery_boy_details: deleviery_boy_details,
        destination_address: destination_address,
        source_address: source_address,
        destination_latlong: destination_latlong,
        total_quantity: total_quantity,
        total_price: total_price,
      })
      .into("orders");
    console.log("Updated values", value);
    response.status = "Success";
    response.message = "Order created";
    response.data = value;
    res.send(response);
  } catch (error) {
    console.log(error);
    response.status = "fail";
    response.message = "Order id exist pleas try with new order id";
    res.send(response);
  }
  return;
};

module.exports = createOrder;
