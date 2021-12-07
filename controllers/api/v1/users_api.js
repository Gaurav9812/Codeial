const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession= async function(req,res)
{
    try{
        console.log(req.body);
    let user=await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            console.log(user);
            return res.json(422,{
                message:'invalid username or password'
            });
        }
        return res.json(200,{
            message:'Sign in successful,here is your token',
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{
                    expiresIn:'100000'
                })

            }
        })
}
    catch(err)
    {
        console.log('err');
        return res.json(500,{
            message:'INTERNAL SERVER ERROR'
        })
    }
}