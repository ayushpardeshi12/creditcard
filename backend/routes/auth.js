const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a user using POST "/api/auth/createuser". Doesn't Require Authentication

router.post(
  "/create",
  [
    body("cardnumber", "Enter a valid Card Number"),
    body("cardHolderName", "Enter a Valid Name"),
    body("expmonth", "Enter a valid Month"),
    body("expyear", "Enter a valid Year"),
    body("cvv", "Enter a valid cvv"),
  ],
  async (req, res) => {
    const { cardnumber, cardHolderName, expmonth, expyear, cvv } = req.body;
    // to check bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ cardnumber: req.body.cardnumber }); // using findOne
      console.log(user);
      if (user) {
        return res.status(400).json({
          error: "User With This Card Number Exists",
        }); // checking if user exists or not
      }
      //creating user if user does not exists
      user = await User.create({
        cardnumber: req.body.cardnumber,
        cardHolderName: req.body.cardHolderName,
        expmonth: req.body.expmonth,
        expyear: req.body.expyear,
        cvv: req.body.cvv,
      });

      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Some Error Occured On Server");
    }
  }
);
module.exports = router;
