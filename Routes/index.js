const express=require('express');
const router=express.Router();
var User=require('../models/user');
const homeController=require('../controllers/homeController');
console.log('routes exported');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

module.exports=router;