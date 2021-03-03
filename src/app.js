const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routers/mainRouter');
const userRouter = require('./routers/userRouter');


app.set("view engine", "ejs") 
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, '../public'))); 


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', mainRouter);
app.use('/user', userRouter);


app.listen(3000, function(){
    console.log('el servidor esta corriendoooooooo :)')
})