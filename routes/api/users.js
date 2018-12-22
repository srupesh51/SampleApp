const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const OnlineUsers = require('../../models/OnlineUsers');
const bcrypt = require('bcrypt');
router.post('/create-user', (req, res) => {

  if(!req.body.name){
    return res.status(400).json({'Error': 'Please specify the name'});
  }

  if(!req.body.email){
    return res.status(400).json({'Error': 'Please specify the email'});
  }
  if(!req.body.password){
    return res.status(400).json({'Error': 'Please specify the password'});
  }
  User.findOne({ email: req.body.email }).then(user => {
      // Check for user
    if (user) {
      const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
      if(isValidPassword){
        const userDetails = { _id: user._id, email: user.email, name: user.name, date: user.date };
        return res.status(200).json(userDetails);
      } else {
        return res.status(400).json({'Error':'Password Invalid'});
      }
    }
  const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))
    });
    newUser.save()
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err));
  }).catch(err => console.log(err));
});
router.get('/', (req, res) => {
    User.find({}).then(user => {
        res.status(200).json(user);
    }).catch(err => console.log(err));
});
module.exports = router;
