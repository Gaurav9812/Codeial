
//method to submit the form data for new post using ajax
function traversingPost()
{
   
     $( ".delete-post-button" ).each( function( index, element ){
        
        deletePost(element);
    });

}
function traversingComment()
{
  
     $( ".delete-comment-button" ).each( function( index, element ){
        
        deleteComment(element);
    });

}

let createpost=function()
{
    let newPostForm=$('#new-post-form');

    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/posts/create',
            data:newPostForm.serialize(),
            success:function(data){
                
                let newPost=newPostDom(data.data.post);
                $('#post-list-container>ul').prepend(newPost);
                
                // req.flash('success','Post published');
                // console.log(flash('success'));
                deletePost($(' .delete-post-button',newPost));
                new Noty({
                    theme: 'relax',
                    text: "post created",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error:function(err){
                console.log(err.responseText);
            }
        })
    });
}
let newPostDom=function(post){
    return $(`<li id="post-${post._id}">
            <p>
            
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">delete</a>
                </small>
                
            ${ post.content}
            <small>
                ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
                
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="type here to add comment" required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="add comment">
                    </form>

                    
                    <div class="post-comments-list">
                        <ul id="post-comments-#{post._id}">

                            
                        </ul>

                    </div>
        </div>
        </li>`)
}
//method to delete a post from dom
let deletePost=function(deleteLink)
{
    console.log(deleteLink);
    $(deleteLink).click(function(e)
    {
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data)
            {
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
            },error:function(err){
                console.log('error',err);
            }
        });
    });
    
}

let createComment=function()
{
$('.new-comment-form').each(function(index,newCommentForm){
    console.log(newCommentForm);
        $(newCommentForm).on('submit',function(e){
        e.preventDefault();
        // console.log(newCommentForm.serialize());
        console.log("hello");
        $.ajax({
            type:'post',
            url:'/comments/create',
            data:$(this).serialize(),
            success:function(data){
                
                let newComment=newCommentDom(data.data.comment);
                                
                $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                
                    
                deleteComment($( ' a',newComment));
                new Noty({
                    theme: 'relax',
                    text: "Comment Published",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
                // deletePost($(' .delete-post-button',newPost));
            },error:function(err){
                console.log(err.responseText);
            }
        })   
    })
    })
}
function newCommentDom(comment)
{
    
    return $(`<li id='comment-${comment._id}'>
    <p>
        
            <small>
                <a href="/comments/destroy/${comment._id}">delete</a>
            </small>
            
            ${comment.content}
        <br>
        <small>
        ${comment.user.name}
        </small>
    </p>
</li>`)
}
//method to delete a comment from dom
let deleteComment=function(deleteLink)
{
    
    $(deleteLink).click(function(e)
    {
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data)
            {
                    console.log(`#comment-${data.data.comment_id}`);
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
            },error:function(err){
                console.log('error',err);
            }
        });
    });
    
}
traversingPost();
createpost();

createComment();
traversingComment();