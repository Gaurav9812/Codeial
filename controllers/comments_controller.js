const Comment=require('../models/Comment.js');

const Post=require('../models/post');
module.exports.create=async function(req,res){
    try{
  let post=await  Post.findById(req.body.post);
       console.log(req.body);
        if(post){

           let comment =await Comment.create({

                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
               //to save in array
                post.comments.push(comment);
                post.save();
                comment= await comment.populate('user','name');
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },
                        message:'comment Created'
                    })
                }
                
                req.flash('success','comment added successfully');
                res.redirect('back');
                
            }
        
    }
    catch(err)
    {
        if(err)
        {
            req.flash('error',err);
            console.log('error',err);
            return ;
        }
    }
    
}

module.exports.destroy=async function(req,res)
{  try{
    console.log(req.params.id);
    let comment= await Comment.findById(req.params.id);
      console.log(comment.post);
      let post=await  Post.findById(comment.post).populate('user');
      console.log( post," ",post.user,"  ",req.user);
            if( comment.user ==req.user.id  || post.user._id==req.user.id)
            {
             
                var postId=comment.post;
                comment.remove();
               await Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}})
              
               if(req.xhr)
               {
                   
                return res.status(200).json({
                    data:{

                        comment_id:req.params.id
                    },
                    message:"comment deleted"
                });
  
               }
               req.flash('success','comment removed '); 
               return res.redirect('back');
                
                
            }
            else{
                
                return res.redirect('back');
                
            }
        }catch(err)

        {
            req.flash('error',err);
            console.log('error',err);
        }
    
        
    
    
}