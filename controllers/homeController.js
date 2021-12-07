const Post =require('../models/post');

const User=require('../models/user');
module.exports.home=async function(req,res)
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
  try
  {
    
  let posts=await Post.find({}).sort('-createdAt').populate('user').populate(
    {path:'comments',
    populate:{
      path:'user'
    }
  })
  
   let users=await User.find({});
  return res.render('home',{
    title:"Codeial Home",
    posts: posts,
    all_users:users
  });
  }
  catch(err){
    console.log('error',err);
  }
}

//promises
//Post.find({}).populate('comments).then(function());
