//============= Requerimientos ===========
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
//=======================================


//============= Config. Puerto ===========
app.set('Port', process.env.PORT || 3000);
//=======================================



//============= Config. Middlewares ===========
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors({origin : '*'}));
//=======================================



//============= Config. Escucha de Puerto ===========
app.listen(app.get('Port'), () => {
    console.log("El servidor está corriendo en el puerto: ",app.get('Port'));
})
//=======================================



//============= Config. Base de datos ===========
require('./database');
//=======================================



//============= Config. Rutas ===========
app.use('/users', require('./routes/user-routes'));
app.use('/products', require('./routes/products-routes'));
//=======================================