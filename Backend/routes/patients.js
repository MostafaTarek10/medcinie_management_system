const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const patient = require("../middleware/patient");
const { body, validationResult } = require("express-validator");
const uplode = require("../middleware/uploadImages");
const { query, Router } = require("express");
const util = require("util"); //helper
const fs = require("fs"); // file system
const { title } = require("process");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//patient SEND A REQUEST
router.post(
  "/request",
  patient,
  body("meds_id").isNumeric().withMessage("please enter a valid medicine id"),
  async (req, res) => {
    const status = "pending";
    const query = util.promisify(conn.query).bind(conn);
    //VALIDATION REQUEST
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const meds = await query("select * from medicines where id = ?", [
      req.body.meds_id,
    ]);
    if (!meds[0]) {
      res.status(404).json({ msg: "medicine not found !" });
    }
    // Insert new medicine request into medicine_request table
    await query(
      "INSERT INTO user_medicines_request (medicines_id, user_id, request) VALUES (?, ?, ?)",
      [meds[0].id, res.locals.patient.id, status],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error creating medicine request");
        }
        return res.status(200).send("medicine request created successfully");
      }
    );
  }
);

//LIST AND SEARCH A medicine FOR user
router.get("/search/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
  }
  const meds = await query(`select * from medicines ${search}`);
  // meds.map((meds) => {
  //     book.image_url = "http://" + req.hostname + ":4000/" + book.image_url;
  // })

  const searchObj = {
    date: new Date(),
    userId: req.params.id,
    search: req.query.search,
  };
  const add = await query("insert into history set ? ", searchObj);

  res.status(200).json(meds);
});

//list history
router.get("/searchHistory/:userId", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const history = await query("select * from history where userId=?", [
      req.params.userId,
    ]);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json(error);
  }
});
// //
// /SHOW SEARCH HISTORY
// router.get("/search/history",reader, async (req, res) => {
//     const query = util.promisify(connection.query).bind(connection);
//     const book = await query("select DISTINCT search from usersearch where user_id = ?", [res.locals.reader.id],
//     (error, results) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).send('ERROR TRY AGAIN LATER');
//         }
//         return res.status(200).json(results);
//     }
// );
//     res.status(200).json("done");
// });
//
module.exports = router;
