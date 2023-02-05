const express=require('express');
const router=express.Router();

const {getallmessages,createamessage}=require('../controllers/messages');

router.route('/').get(getallmessages).post(createamessage); 


module.exports=router