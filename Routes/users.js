const express = require("express");
const passport=require('passport');
const router=express.Router();
const userController=require('../controllers/Users_controller');

router.get('/',userController.home);
console.log('routs');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);


router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
router.post('/create',userController.create);

//
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}

 ) ,userController.createSession);


 router.get('/sign-out',userController.destroySession);
module.exports=router;