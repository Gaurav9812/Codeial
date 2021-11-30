const Post =require('../models/post');

const User=require('../models/user');
module.exports.home=function(req,res)
{
  //to access cookies
  // console.log(req.cookies);

  // to alter cookies
  // res.cookie('name','Jatin');
  
  // Post.find({},function(err,posts){
  //     return res.render('home',{
  //       title:"Codeial Home",
  //       posts:posts
  //     });
  // });
  
  //populate the user of each post(means instead of id whole user will be stored)
  Post.find({}).populate('user').populate(
    {path:'comments',
    populate:{
      path:'user'
    }
  }).exec(function(err,posts){
    
    if(err)
    {
      console.log(`error in fetching post ${err}`);
      return;
    }
    User.find({},function(err,users){
    return res.render('home',{
      title:"Codeial Home",
      posts: posts,
      all_users:users
    });
  })
  });
}
module.exports.profile=function(req,res)
{
  return  res.end("<h1> Codeial progile page page</h1>");
}