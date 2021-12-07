const Post=require('../../../models/post');
const Comment=require('../../../models/Comment');
module.exports.index=async function(req,res){
    let posts=await Post.find({}).sort('-createdAt').populate({
      path:'user',
    select:'-password'
    }).populate(
        {path:'comments',
        populate:{
          path:'user',
          select:'-password'
        }
      })
    return res.json(200,{
        message:"list of post",
        posts:posts
    });
}


module.exports.destroy =async function(req,res)
{
    try{
     let post =await Post.findById(req.params.id);
        // .id ,=means object id into string
        if(post.user == req.user.id){
            post.remove();
          await  Comment.deleteMany({post:req.params.id});
          res.status('200').json({
            "message":" post associated deleted succesfully"
          })
        }else{
          return res.json(401,{
            message:'you cannot delete this post'
          })
        }
          // if(req.xhr)
          // {
              
             
        //      return res.status(200).json({
        //           data:{
        //               post_id:req.params.id
        //           },
        //           message:"post deleted"
        //       });
        //   }
        //   req.flash('success','Post and associated comments removed') ;     
        //   return res.redirect('back');
            
            
        // }
        // else{
        //     req.flash('error','U r not allowed to delete the post');
        // return res.redirect('back');
        // }
    }catch(err)
    {

        console.log('ERROR',err);
        return res.status('500').json({
          "message":" Internal server"
        });
    }

}