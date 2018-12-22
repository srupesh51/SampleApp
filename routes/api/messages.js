const express = require('express');
const router = express.Router();
const Message = require('../../models/Message');
const User = require('../../models/User');
const Conversation = require('../../models/Conversation');
const OnlineUsers = require('../../models/OnlineUsers');
router.post('/send-message', (req, res) => {

  if(!req.body.user){
    return res.status(400).json({'Error': 'Please specify the user'});
  }

  if(!req.body.text){
    return res.status(400).json({'Error': 'Please specify the message body'});
  }
  User.findOne({ email: req.body.user }).then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json({'Error': 'User not Found'});
      }
      const newMessage = new Message({
          user: user,
          text: req.body.text
        });
      newMessage
        .save()
        .then(message => {
          if (!message) {
            return res.status(404).json({'Error': 'Unable to save message'});
          }
          const newConversation = new Conversation({
              user: user,
              message: message
            });
            newConversation
              .save()
              .then(message => res.status(200).json(message) )
              .catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

router.post('/', (req, res) => {
  if(!req.body.user){
    return res.status(400).json({'Error': 'Please specify the user'});
  }
  User.findOne({ email: req.body.user }).then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json({'Error': 'User not Found'});
      }
     Conversation.find({ })
    .populate('user', ['name'])
    .populate('message',['date','text'])
    .then(messages => {
      if (!messages) {
        res.status(404).json({'Error': 'There is no conversation for this user'});
      }
      res.status(200).json(messages);
    })
    .catch(err =>
      res.status(404).json(err)
    );
    }).catch(err => console.log(err));
});

module.exports = router;
