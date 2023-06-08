const router = require("express").Router();
const conn = require("../db/dbConnection");
const admin = require("../middleware/admin");

const { body, validationResult } = require("express-validator");
// const uplode = require("../middleware/uploadImages");
const { query, Router } = require("express");
const util = require("util"); //helper
const fs = require("fs"); // file system
const { title } = require("process");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//ADMIN
//list
router.get("/listMed/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const med = await query(
    "SELECT * FROM medicines WHERE id = ?",
    [req.params.id],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving patient");
      } else {
        res.status(200).json(results);
      }
    }
  );
});
//1-MANAGE MEDS
//CREATE medicine
router.post(
  "/createMed/",
  // admin,
  // uplode.single("image"),
  //uplode.single("file"),
  body("name")
    .isString()
    .withMessage("please enter a valid medicine name")
    .withMessage("medicine name should be at least 10 characters"),

  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 20 })
    .withMessage("description name should be at least 20 characters"),

  body("price"),
  body("expirationDate"),
  body("categoryId"),

  body("categoryId"),

  async (req, res) => {
    try {
      //VALIDATION REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //VALIDATE THE IMAGE
      // if (!req.file) {
      //     return res.status(400).json(
      //         {
      //             errors: [
      //                 {
      //                     msg: "Image is Required",
      //                 },
      //             ],
      //         },
      //     )
      // }
      //PREPARE medicine OBJECT
      const meds = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        expirationDate: req.body.expirationDate,
        categoryId: req.body.categoryId,
      };
      //INSERT medicine TO DB
      const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
      await query("insert into medicines set ? ", meds);
      console.log(meds),
        console.log("meds"),
        res.status(200).json({
          msg: "medicine created successfully !",
        });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//UPDATE Medicine
router.put(
  "/update/:id",
  // admin,
  // uplode.single("image"),
  //uplode.single("file"),
  body("name")
    .isString()
    .withMessage("please enter a valid medicine name")
    .withMessage("medicine name should be at least 10 characters"),

  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 20 })
    .withMessage("description name should be at least 20 characters"),

  body("price"),
  body("expirationDate"),
  body("categoryId"),

  async (req, res) => {
    try {
      //VALIDATION REQUEST
      const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //CHECK IF medicine EXIST
      const meds = await query("select * from medicines where id = ?", [
        req.params.id,
      ]);
      if (!meds[0]) {
        res.status(404).json({ msg: "medicine not found !" });
      }
      //PREPARE medicine OBJECT
      const medsObj = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        expirationDate: req.body.expirationDate,
        categoryId: req.body.categoryId,
      };
      // if (req.file) {
      //     medsObj.image_url = req.file.filename;
      //     fs.unlinkSync("./upload/" + meds[0].image_url);

      // }
      //UPDATE medicine
      await query("update medicines set ? where id = ?", [medsObj, meds[0].id]);
      res.status(200).json({
        msg: "medicine updated succsessfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//DELETE medicine
router.delete("/delete/:id", async (req, res) => {
  try {
    //CHECK IF medicine EXIST
    const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
    const meds = await query("select * from medicines where id = ?", [
      req.params.id,
    ]);
    if (!meds[0]) {
      res.status(404).json({ msg: "medicine not found !" });
    }
    // //REMOVE IMAGE
    // fs.unlinkSync("./upload/" + meds[0].image_url);

    //UPDATE medicine
    await query("delete from medicines where id = ?", [meds[0].id]);
    res.status(200).json({
      msg: "medicine deleted succsessfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LIST AND SEARCH A medicine FOR user AND ADMIN
router.get("/search", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
  }
  const meds = await query(`select * from medicines ${search}`);
  // meds.map((meds) => {
  //     book.image_url = "http://" + req.hostname + ":4000/" + book.image_url;
  // })
  res.status(200).json(meds);
});

//___________________________________________________________________________---
//1-MANAGE MedsCategory

// create medicine categorie
router.post(
  "/createCat",
  // admin,
  // uplode.single("image"),
  //uplode.single("file"),
  body("name").isString().withMessage("please enter a valid category name"),

  body("description")
    .isString()
    .withMessage("please enter a valid description "),

  async (req, res) => {
    try {
      //VALIDATION REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const meds = {
        name: req.body.name,
        description: req.body.description,
        id: req.body.id,
      };
      //INSERT medicine TO DB
      const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
      await query("insert into medicinescategory set ? ", meds);

      res.status(200).json({
        msg: " new medicines categories created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//  get all medicines category
router.get("/listCategory", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);

  const meds = await query("select * from medicinescategory");

  res.status(200).json(meds);
});

//update medicine category

router.put(
  "/updateCategory/:id",
  // admin,
  // uplode.single("image"),
  //uplode.single("file"),
  body("name")
    .isString()
    .withMessage("please enter a valid category name")
    .withMessage("category name should be at least 10 characters"),

  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 20 })
    .withMessage("description name should be at least 20 characters"),

  async (req, res) => {
    try {
      //VALIDATION REQUEST
      const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //CHECK IF medicine EXIST
      const meds = await query(
        "select * from medicinescategory where id  = ?",
        [req.params.id]
      );
      if (!meds[0]) {
        res.status(404).json({ msg: "medicine category not found !" });
      }
      //PREPARE medicine OBJECT
      const medsObj = {
        name: req.body.name,
        description: req.body.description,
      };
      //UPDATE medicine
      await query("update medicinescategory set ? where id  = ?", [
        medsObj,
        req.params.id,
      ]);
      res.status(200).json({
        msg: "medicines category updated succsessfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//delete medicine category
router.delete("/deletCategory/:id", async (req, res) => {
  try {
    //CHECK IF medicine EXIST
    const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
    const meds = await query("select * from medicinescategory where id   = ?", [
      req.params.id,
    ]);
    if (!meds[0]) {
      res.status(404).json({ msg: "medicine category not found !" });
    }
    // //REMOVE IMAGE
    // fs.unlinkSync("./upload/" + meds[0].image_url);

    //UPDATE medicine
    await query("delete from medicinescategory  where id = ?", [req.params.id]);
    res.status(200).json({
      msg: "medicine category deleted succsessfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//______________________________________________________________________________________________
// 3-Manage Patients

// create patient
router.post(
  "/createPatient",
  // admin,
  body("email").isEmail().withMessage("please enter a valid email !"),
  body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 5 })
    .withMessage("name should be between (10-20) character"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  body("phone"),
  // .isLength({ min: 6 })
  // .withMessage("phone must be at least 6 chars long"),

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
      // const checkPhoneExists = await query("select * from user where phone = ?", [req.body.phone]);
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email alredy exists !",
            },
          ],
        });
      }
      // else if (checkPhoneExists.length > 0) {
      //     res.status(400).json(
      //         {
      //             errors: [
      //                 {
      //                     "msg": "phone alredy exists !"
      //                 }
      //             ]
      //         }
      //     )
      // }
      //PREPARE OBJECT USER TO -> SAVE
      const patient = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        phone: req.body.phone,
        tokens: crypto.randomBytes(16).toString("hex"), //RANDOM ENCRYPTION STANDARD
      };
      //INSERT USER OBJECT INTO DB
      await query("insert into user set ? ", patient);
      delete patient.password;
      res.status(200).json(patient);
      res.json("success");
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: err });
    }
  }
);

//update patient
router.put(
  "/updatePatient/:id",
  // admin,
  body("email").isEmail().withMessage("please enter a valid email !"),
  body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 5 })
    .withMessage("name should be between (10-20) character"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  body("phone")
    .isLength({ min: 6 })
    .withMessage("phone must be at least 6 chars long"),
  async (req, res) => {
    try {
      //VALIDATION REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //CHECK IF EMAIL
      const query = util.promisify(conn.query).bind(conn);
      const patient = await query("select * from user where id = ?", [
        req.params.id,
      ]);
      if (!patient[0]) {
        res.status(404).json({ msg: "patient not found !" });
      }
      //transform query mysql -> promise to use [await/async]
      const checkEmailExists = await query(
        "select * from user where email = ?",
        [req.body.email]
      );
      // const checkPhoneExists = await query(
      //   "select * from user where phone = ?",
      //   [req.body.phone]
      // );
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email alredy exists !",
            },
          ],
        });
      }
      // else if (checkPhoneExists.length > 0) {
      //   res.status(400).json({
      //     errors: [
      //       {
      //         msg: "phone alredy exists !",
      //       },
      //     ],
      //   });
      // }
      //PREPARE OBJECT USER TO -> SAVE
      const patientObj = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        phone: req.body.phone,
        tokens: crypto.randomBytes(16).toString("hex"), //RANDOM ENCRYPTION STANDARD
      };
      //INSERT patient OBJECT INTO DB
      await query("update user set ? where id = ?", [
        patientObj,
        patient[0].id,
      ]);
      res.status(200).json({
        msg: "patient updated succsessfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: err });
    }
  }
);
//DELETE patient
router.delete("/deletePatient/:id", async (req, res) => {
  const patientId = req.params.id;
  const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
  /*     const reader = await query("select * from users where id = ?", [req.params.id]);
        if (!reader[0]) {
            res.status(404).json({ msg: "reader not found !" });
        } */

  await query(
    'DELETE FROM user WHERE id = ? AND type = "0"',
    [patientId],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error deleting patient");
      } else if (results.affectedRows === 0) {
        res.status(404).send("patient not found");
      } else {
        res.status(200).send("patient deleted successfully");
      }
    }
  );
});
//LIST patient
router.get(
  "/listPatient",
  //  admin,
  async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    await query(
      'SELECT * FROM user WHERE type = "0"',
      (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error retrieving patient");
        } else {
          res.status(200).json(results);
        }
      }
    );
  }
);

router.get("/listMed/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const med = await query(
    "SELECT * FROM medicines WHERE id = ?",
    [req.params.id],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving patient");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

//_______________________________________________________________________________________________

//list request for a specific patient
router.get("/listRequest/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  await query(
    "SELECT  medicines_id FROM user_medicines_request WHERE user_id = ? ",
    [req.params.id],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error list reqeust ");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

//LIST THE PENDING REQUEST
router.get("/listRequests/pending", async (req, res) => {
  // Retrieve all pending book requests
  const query = util.promisify(conn.query).bind(conn);
  await query(
    'SELECT * FROM user_medicines_request WHERE request = "pending"',
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error retrieving medicines requests");
      }
      return res.status(200).json(results);
    }
  );
});
//ADMIN ACCEPT A REQUEST
router.put("/acceptRequest/:id", async (req, res) => {
  const requestId = req.params.id;

  // Update medicines request status in medicines_request table
  const query = util.promisify(conn.query).bind(conn);
  await query(
    'UPDATE user_medicines_request SET request = "accepted" WHERE id = ?',
    [requestId],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error updating medicine request");
      }
      return res.status(200).send("medicine request accepted successfully");
    }
  );
});
//ADMIN decline A REQUEST
router.put("/declineRequest/:id", async (req, res) => {
  const requestId = req.params.id;

  // Update medicine request status in medicines_comments table
  const query = util.promisify(conn.query).bind(conn);
  await query(
    'UPDATE user_medicines_request SET request = "declined" WHERE id = ?',
    [requestId],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error updating medicine request");
      }
      return res.status(200).send("medicine request declined successfully");
    }
  );
});
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
router.get("nerId", async (req, res) => {
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

module.exports = router;
