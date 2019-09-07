'use strict'
//Set dependencies and add them to variables, and acquire our models 
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const authenticateUser = require('./authenticate');
const { User } = require('../db/models');

/* Middleware function to clean up code */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(err) {
      next(err);
    }
  }
}

/* Retrieves all users */
router.get('/', authenticateUser, 
  asyncHandler( async (req, res) => {
    const user = req.currentUser;
    res.status(200).json({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    });
  })
);

/* Creates user */
router.post('/', [
  //Ensure name, email and password are present in request
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide your "First Name"'),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide your "Last Name"'),
  check('emailAddress')
    .exists({ checkNull: true, checkFalsy: true })
    // .isEmail()
    .withMessage('Please provide your "Email Address"'),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a "Password"')
  ], 

  asyncHandler( async (req, res) => {
    // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);
    console.log('poipoipoipoipoipoipoipoi', errors);
    // If there are validation errors...
    if (!errors.isEmpty()) {
      // Use the Array `map()` method to get a list of error messages.
      const errorMessages = errors.array().map(error => error.msg);
      // Return the validation errors to the client.
      return res.status(400).json({ errors: errorMessages });
    } else if (req.body.firstName && req.body.lastName 
        && req.body.emailAddress && req.body.password) {

      req.body.password = bcryptjs.hashSync(req.body.password);
      const user = await User.create(req.body);
      res.location('/').status(201).end();

    } else {
      res.status(400).json({message: "First name, last name, email address, password is required."});
    }
  })
);

//Expose router as a module
module.exports = router;