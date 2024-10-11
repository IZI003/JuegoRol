const express = require('express');
//creamos el servidor
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
const conectarDB = require('./Database');

conectarDB();
app.use(express.json());
const port = 3000;
app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use(morgan('dev'));
app.use(bodyparser.json());
//route
app.use('/api/v1/', require('./Routers/V1/PerfilRoutes'));

//start servidor
app.listen(port, () => {
    console.log(`Server en el puerto  http://localhost:${port}`)
});
