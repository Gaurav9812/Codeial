const express = require("express");
const router=express.Router();
const userController=require('../controllers/Users_controller');

router.get('/',userController.home);
console.log('routs');
router.get('/profile',userController.profile);

router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
router.post('/create',userController.create);
module.exports=router;