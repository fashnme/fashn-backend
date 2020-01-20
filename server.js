//Core Library Imports
const http = require('http');

//External Library Imports
const cors =require('cors');
const express = require('express');
const bodyParser=require('body-parser');
const morgan = require('morgan');

// Inject dotenv environment 
require('dotenv').config();

//Router File Import
const router=require('./router');
const { logsDumpingTask } = require('./microscripts/tasks/logging/logs-dumping-task');


//Initializing Express App
var app = express();


//Create Server using http
var server = http.createServer(app);
server.timeout = 30000;

//pass a http.Server instance to socket.io
var io = require('socket.io').listen(server);

//Registering Middleware
app.use(bodyParser.json({type:'*/*',limit: '50mb',parameterLimit: 50000 }));
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(cors({origin:"*"}))

router(app)

const port = process.env.PORT || 8080

server.listen(port,()=>{
	console.log(`\x1b[1mServer Started at Port: ${port}`);
	logsDumpingTask();
})

