var express = require('express');
var router = express.Router();
var userService = require('../services/userService');

/* GET user by name listing. */
router.get('/byName', async function(req, res, next) {

  try {

      // First we need to pull the name from the incoming query parameters
      var user = req.query.name;

      // We will be receiving first and last name together from the frontend, however our data in the data base has first name and last name separate. 
      // This means that we will have to separate the first from the last name in the incoming query parameter.
      var name = user.split(' ');
      var firstName = name[0];
      var lastName = name[1];

      // Send request to user service. The service will query the database using the firstname and lastname that we pass in.
      userService.getUserDetailsByName(firstName, lastName, (err, user) => {

            if (err) {
              res.sendStatus(400);
            }

            // Return the user record that was received from the call to the database in the user service.
            console.log(user);
            res.send(user);
      })
      
  } catch(err) {
      console.log(err);
  }
});

/* GET user by email listing. */
router.get('/byEmail', async function(req, res, next) {

  try {

      // Get the email from the incoming query parameter
      var email = req.query.email;

      // Send request to user service. The service will query the database using the email we pass in.
      userService.getUserDetailsByEmail(email, (err, user) => {
        
            if (err) {
              res.sendStatus(400);
            }

            // Return the user record that was received from the call to the database in the user service.
            console.log(user);
            res.send(user);
      })
      
  } catch(err) {
      console.log(err);
  }
});

module.exports = router;
