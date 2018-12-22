const express = require('express');
const router = express.Router();
const HobseSupport = require('../../models/HobseSupport');
router.post('/', (req, res) => {
  if(!req.body.user){
    return res.status(400).json({'Error': 'Please specify the user'});
  }
  HobseSupport.find({email: req.body.user })
    .then(messages => {
      if (!messages) {
        res.status(404).json({'Error': 'There is no conversation for this user'});
      }
      console.log(messages);
      res.status(200).json(messages[0].hobse_info.messages);
    })
    .catch(err =>
      res.status(404).json(err)
    );
});
router.post('/send-message', (req, res) => {
  if(!req.body.user){
    return res.status(400).json({'Error': 'Please specify the user'});
  }
  if(!req.body.name){
    return res.status(400).json({'Error': 'Please specify the name'});
  }
  if(!req.body.message){
    return res.status(400).json({'Error': 'Please specify the message body'});
  }
  let newSupportData = new HobseSupport({
    email: req.body.user,
     name: req.body.name,
     hobse_info: req.body.message
    });
    HobseSupport.findOne({email: req.body.user } ,(err,messages) => {
        console.log(messages);
        if(err){
          return res.status(400).json(err);
        }
        if (!messages) {
          console.log(messages);
          newSupportData.save()
          .then(booking => res.status(200).json(booking))
          .catch(err => {
            res.status(400).json(err);
          });
          return;
        }
        console.log(messages.hobse_info,newSupportData.hobse_info,"LA");
        //res.status(200).json(messages[0].hobse_info.messages);
        const obj2 = messages.hobse_info;
        const obj1 = newSupportData.hobse_info;
        const obj = {...obj2,...obj1};
        const query = {"email": req.body.user};
        const update = {"hobse_info": obj};
        const options = {new: true};
        HobseSupport.updateOne(query,update,(err, message_details) => {
            if(err){
              return res.status(400).json(err);
            }
            res.status(200).json(message_details);
        })
  })
});
module.exports = router;
