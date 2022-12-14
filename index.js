const express=require('express');
const app = express();
const port =8000;
const expressLayouts =require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser=require('cookie-parser');

//reading through the post requests
app.use(express.urlencoded());

//setting up the cookie parser 
app.use(cookieParser());

//accessing static files in assets
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract styles & scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes/index'));

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running : ${err}`);
    }
    console.log(`Server is running on port : ${port}`)
})