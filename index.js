const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const logger = require('./middleware/logger')
const members = require('./Members')


const app = express();
const PORT = process.env.PORT || 4000;


//init middleware
//app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Body parser middleware init
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Homepage Routes
app.get('/',(req,res)=> res.render('index',{
    title:'Members App',
    members
}))

//Members API routes
app.use('/api/members', require('./routes/members'));

//Set static folder
app.use(express.static(path.join(__dirname,'public')));


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})