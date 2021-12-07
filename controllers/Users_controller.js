const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.home=function(req,res)
{
    res.end('<h1> This is Users home page page</h1>');
}
module.exports.profile=function(req,res)
{
    User.findById(req.params.id,function(err,user){
        return  res.render('user_profile',{
            title:'User profile',
            profile_user:user
        });
        
    });
   
}
module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
        
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id==req.params.id){
        try{
                let user=await User.findById(req.params.id);
                User.uploadedAvatar(req,res,function(err){
                    if(err)
                    {
                        console.log(`Multer Error:`,err);
                    }
                    console.log(req.file);
                    user.name=req.body.name;
                    user.email=req.body.email;
                    if(req.file)
                    {
                        if(user.avatar)
                        {
                            if(fs.existsSync(path.join(__dirname,'../',user.avatar))){
                                    fs.unlinkSync(path.join(__dirname,'../',user.avatar));
                               
                            }
                            

                        }
                        //saving the path of the uploaded file into the avatar field in the user
                        user.avatar=User.avatarPath+'/'+req.file.filename;
                        console.log(User.avatarPath+'/'+req.file.filename);

                    }
                    user.save();
                    return res.redirect('back');
                });
        }
        catch(err){

        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('signUp');
}
module.exports.signin=function(req,res){
    console.log("here");
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('signIn');
}
//sign in and create a session for user
module.exports.createSession=function(req,res)
{
    
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
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
            console.log(`error in finding user in signing up`);
            return;
        }
        if(!user)
        {
            User.create({
                email:req.body.email,
                password:req.body.password,
                name:req.body.name
            },function(err,newUser){
                if(err)
                {
                    console.log(`error creating user while signing up ${err}`);
                    
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
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}
