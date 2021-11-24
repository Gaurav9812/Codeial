const passport =require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user.js');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },function(req,email,password,done){
            console.log("hell inside");
        //find a user and establish the identity
           User.findOne({email:email},function(err,user){
               if(err){
                   console.log(`error in finding user ==> passport`);
                   return done(err);
               }
               if(!user || user.password != password ){
                    console.log(`invalid username or password`);
                    return done(null,false);
               }
              
               return done(null,user);
           }); 
    }
    
    ));
  
  

//check if the user is authenticated
passport.checkAuthentication =function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('./signin');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        console.log("hell ");
        res.locals.user=req.user;
    }
    next();
}
  //serializing the user to decide which key is to be kept in the cookies
  passport.serializeUser(function(user,done){
    done(null,user.id);
});


//desiarializing user
passport.deserializeUser(function (id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log(`error in finding user ==> passport`);
               return done(err);
            }
        console.log("here des")
        return done(null,user);
    });
});
module.exports=passport;