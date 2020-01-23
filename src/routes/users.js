var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var router = express.Router();
var UserSchema = require('../models/User');

// const bcrypt = Promise.promisifyAll(_bcrypt);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

generateHashPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

// User Sign-up
router.post('/sign-up', async (req, res, next) =>  {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: 'Email or Password not provided' }).json();
  } else {
    try {
      const hashpassword = await generateHashPassword(password);
      const userObj = new UserSchema({ email, password: hashpassword });
      const user = await userObj.save();
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      const newUserObj = user.toObject();
      delete newUserObj.password;
      const newUser = {
        user: newUserObj,
        token
      }
      res.status(201).send(newUser);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

// User login
router.post('/login', async (req, res, next) =>  {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: 'Email or Password not provided' }).json();
  } else {
    try {
      const user = await UserSchema.findOne({ email });
      if (user) {
        const result = bcrypt.compareSync(password, user.password);
        if (result) {
          const token = jwt.sign({ email }, process.env.JWT_SECRET);
          const newUserObj = user.toObject();
          delete newUserObj.password;
          const newUser = {
            user: newUserObj,
            token
          }
          res.status(200).send(newUser);
        } else {
          res.status(200).send({ message: "Username or password is incorrect" }).json();
        }
      } else {
        res.status(200).send({ message: "User not found" }).json();
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
