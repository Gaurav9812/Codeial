const Post=require('../models/post');
const Comment=require('../models/Comment')
module.exports.create=async function(req,res){
    try{
    let post=await Post.create({
        content:req.body.content,
        user:req.user.id  
        
    });
    
    
    
    if(req.xhr){
        // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
        post = await post.populate('user', 'name');
        console.log("post is"," ", post);
        return res.status(200).json({
            data:{
                post:post
            },
            message:'post Created'
        })
    }
    
    return res.redirect('back');
    }
    catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
        

}

module.exports.destroy =async function(req,res)
{
    try{
     let post =await Post.findById(req.params.id);
        // .id ,=means object id into string
        if(post.user == req.user.id){
            post.remove();
          await  Comment.deleteMany({post:req.params.id});

          if(req.xhr)
          {
              
             
             return res.status(200).json({
                  data:{
                      post_id:req.params.id
                  },
                  message:"post deleted"
              });
          }
          req.flash('success','Post and associated comments removed') ;     
          return res.redirect('back');
            
            
        }else{
            req.flash('error','U r not allowed to delete the post');
        return res.redirect('back');
        }
    }catch(err)
    {
        console.log('ERROR',err);
        return;
    }

}