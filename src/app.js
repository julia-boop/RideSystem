const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const createLocals = require('./middlewares/createLocals');
const mainRouter = require('./routers/mainRouter');
const userRouter = require('./routers/userRouter');
const concursoRouter = require('./routers/concursoRouter');


app.set("view engine", "ejs") 
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, '../public'))); 
app.use(session({secret:'hey'}))


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(createLocals);

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/concurso', concursoRouter);


app.listen(3000, function(){
    console.log('el servidor esta corriendoooooooo :)')
})