const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper fn
const bcrypt = require("bcrypt"); // for pass
const crypto = require("crypto"); // for token
const authorized = require("../middleware/authorize");

//LOGIN
router.post(
  "/login",
  // authorized,
  //el hagat eli bttb3t when register
  body("email").isEmail().withMessage("please enter a valid email"),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("please enter a valid password between 8 and 16 characters"),
  async (req, res) => {
    try {
      //1- validation req

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } //else

      //2-check if email exists
      //await/async
      const query = util.promisify(conn.query).bind(conn); //transform query mysql to promise to use await &a sync
      const checkEmailExists = await query(
        "select * from user where email =?",
        [req.body.email]
      );

      if (checkEmailExists.length == 0) {
        res.status(400).json({
          errors: [{ msg: "email or password is not found" }],
        });
      }

      //3- compare password

      const checkPassword = await bcrypt.compare(
        req.body.password,
        checkEmailExists[0].password
      );
      if (checkPassword) {
        delete checkEmailExists[0].password;
        // const checkStatus = await query(
        //   "select status from users where email =?",
        //   [req.body.email]
        // );
        if (checkEmailExists[0].status == "0") {
          await query("UPDATE user SET status = 1 WHERE id = ?", [
            checkEmailExists[0].id,
            // res.locals.user.id,
          ]);
        }
        res.status(200).json(checkEmailExists[0]);
      } else {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found !",
            },
          ],
        });
      }
    } catch (error) {
      console.log("ERROR!!!!!!!!!");
      console.log(error);
      res.status(500).json({ error: error + "error" });
    }
  }
);
// REGISTRATION
router.post(
  "/register",
  body("email").isEmail().withMessage("please enter a valid email !"),
  body("name").isString().withMessage("please enter a valid name"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  body("phone"),
  async (req, res) => {
    try {
      //VALIDATION REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //CHECK IF EMAIL
      const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
      const checkEmailExists = await query(
        "select * from user where email = ?",
        [req.body.email]
      );
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email alredy exists !",
            },
          ],
        });
      }
      //PREPARE OBJECT USER TO -> SAVE
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10), // hash and save value
        tokens: crypto.randomBytes(16).toString("hex"), //RANDOM ENCRYPTION STANDARD , advanced --> jason web token
      };
      //INSERT USER OBJECT INTO DB
      await query("insert into user set ? ", userData);
      delete userData.password;
      res.status(200).json(userData);
      res.json("success");
    } catch (err) {
      console.log(err), res.status(500).json({ err: err }); // to catch err on terminal
    }
  }
);

module.exports = router;
