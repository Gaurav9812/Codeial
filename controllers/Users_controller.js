const User=require('../models/user');

module.exports.home=function(req,res)
{
    res.end('<h1> This is Users home page page</h1>');
}
module.exports.profile=function(req,res)
{
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                    return res.render('user_profile',{
                        user:user
                    });
            }
            return res.redirect('/users/signin')
        });
    }else{
        return res.redirect('/users/signin');
    }

    
}

module.exports.signup=function(req,res){
    return res.render('signUp');
}
module.exports.signin=function(req,res){
    console.log("here");
    return res.render('signIn');
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
//sign in and create a session for user
module.exports.createSession=function(req,res)
{
    //steps to authenticate


    //find the user

    User.findOne({email:req.body.username},function(err,user){
       
        if(err)
        {
            console.log(`error in finding user in signing in`);
            return ;
        }
        //handle user found
        if(user){
            
    //handle password which don't match

            if(user.password!=req.body.password){
                return res.redirect('back');
            }
                //handle session creation

            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }else{
                //handle user not found

            return res.redirect('back');
        }
    });
    
}
module.exports.signout=function(req,res)
{
    res.cookie('user_id','');
    res.redirect('/users/signin')
}