const User=require('../models/user');

module.exports.home=function(req,res)
{
    res.end('<h1> This is Users home page page</h1>');
}
module.exports.profile=function(req,res)
{
    res.end('<h1> This is Users profile page</h1>');
}

module.exports.signup=function(req,res){
    return res.render('signUp');
}
module.exports.signin=function(req,res){
    console.log("here");
    return res.render('signIn');
}
//sign in and create a session for user
module.exports.createSession=function(req,res)
{

}
//get the sign-up data
module.exports.create=function(req,res)
{
    console.log(req.body);
    if(req.body.password!=req.body.confirm_password)
    {
        res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log(`error in finding user in signinh up`);
            return;
        }
        if(!user)
        {
            User.create({
                email:req.body.username,
                password:req.body.password,
                name:req.body.name
            },function(err,newUser){
                if(err)
                {
                    console.log(`error creating user while signing up`);
                    
                    return;
                }
                console.log('userCreated')
                return res.redirect('/users/signin');
            });
                    
        }else{
            return res.redirect('back');
        }
    });

   
    
}
