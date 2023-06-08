const conn = require("../db/dbConnection");
const util = require("util");

const patient = async (req, res, next) => {
  const query = util.promisify(conn.query).bind(conn);
  const { tokens } = req.headers;
  const patient = await query("select * from user where tokens = ?", [tokens]);
  if (patient[0] && patient[0].type == "0") {
    res.locals.patient = patient[0];
    next();
  } else {
    res.status(403).json({
      msg: "you are not authorized to access this route !",
    });
  }
};
module.exports = patient;
