const express=require('express');
const router=express.Router();

const homeController=require('../controllers/homeController');
console.log('routes exported');

router.get('/',homeController.home);
router.use('/users',require('./users'));
module.exports=router;