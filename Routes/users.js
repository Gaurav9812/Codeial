const express = require("express");
const router=express.Router();
const userController=require('../controllers/Users_controller');

router.get('/',userController.home);
console.log('routs');
router.get('/profile',userController.profile);

router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
router.get('/signout',userController.signout);

router.post('/create',userController.create);
router.post('/createSession',userController.createSession);

module.exports=router;