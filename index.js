const express=require('express');
const cookieParser=require('cookie-parser');
const port =8001;
const app=express();
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');
//static files
app.use(express.static('./assets'));

app.use(cookieParser());

app.use(express.urlencoded());
app.use(expressLayouts);
//extract style and scropt from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// Use express router
app.use('/',require('./Routes/index'));

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in setting up server`);
        return ;
    }
    console.log(`server is running on port :${port}`);
});