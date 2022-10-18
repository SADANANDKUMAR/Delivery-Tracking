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

const updateLocations = async (req, res) => {
  const { delivery_status, source_latlong } = req.body;
  let response = { status: "", message: "", data: {} };
  var route_latlong = [];
  const date = new Date().toISOString();
  const updatedvalue = source_latlong;
  updatedvalue["timestamp"] = date;


  try {
    console.log("====Log from user===",source_latlong);
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
    //##Taking all data to of specfic order id
    const result = await knexas
      .select("*")
      .where({ order_id: req.params.order_id })
      .from("orders");

    route_latlong.push(updatedvalue);
    const z = result[0].route_latlong;
    route_latlong = route_latlong.concat(z);
    console.log("====UPDATED LATLONG =====",route_latlong);
    const value = await knexas("orders")
      .update({
        delivery_status: JSON.stringify(delivery_status),
        source_latlong: JSON.stringify(source_latlong),
        route_latlong: JSON.stringify(route_latlong),
      })
      .where({ order_id: req.params.order_id });

    if (value) {
      response.status = "Success";
      response.message = "Location Updated";
      response.data = value;
    }
  } catch (error) {
    console.log(error);
    response.status = "fail";
    response.message = error;
  }
  res.send(response);
};

module.exports = updateLocations;
