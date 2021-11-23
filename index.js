const express=require('express');
const cookieParser=require('cookie-parser');
const port =8001;
const app=express();
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src:'/assets/scss',//from where to pick up SCSS file 
    dest:'/assets/css',//from where to drop css file
    debug:true,         //display error in console
    outputStyle:'extended',//display in multiple lines
    prefix:'/css'           
}));
//static files
app.use(express.static('./assets'));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
//extract style and scropt from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //change the secret before deployment 
    secret:'blahSascasc',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
     }
    ,
    store:  MongoStore.create({

            mongoUrl:'mongodb://localhost/codial_development',
            autoRemove:'disabled'
        
    },function(err){
        console.log(err || `connect -mongg db setup ok`)
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// Use express router
app.use('/',require('./Routes/index'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in setting up server`);
        return ;
    }
    console.log(`server is running on port :${port}`);
});