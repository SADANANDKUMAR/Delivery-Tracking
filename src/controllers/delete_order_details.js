const knex = require("knex");
console.log("================");
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

//Secret Token

var TOKEN_SECRET =
  "hcjsdbshhsbdcjbsjjbsbbdibjnssxjudqwnanjnxjsjxcceuhfbdsqklhgyxrdrxsx";

const deleteOrder = async (req, res) => {
  let response = { status: "", message: "", data: [] };
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

    const result = await knexas("orders")
      .delete()
      .from("orders")
      .where({ order_id: req.params.order_id });
    if (result) {
      response.status = "success";
      response.message = "Data deleted";
    } else {
      response.status = "fail";
      response.message = "Fail to delete Data";
    }
  } catch (error) {
    response.status = "fail";
    response.message = "Fail to delete Data";
  }
  res.send(response);
};

module.exports = deleteOrder;
