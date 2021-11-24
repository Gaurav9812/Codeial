const Post =require('../models/post');

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
  
  //populate the user of each post
  Post.find({}).populate('user').exec(function(err,posts){
    if(err)
    {
      console.log(`error in fetching post ${err}`);
      return;
    }
    return res.render('home',{
      title:"Codeial Home",
      posts: posts
    });
  });
}
module.exports.profile=function(req,res)
{
  return  res.end("<h1> Codeial progile page page</h1>");
}