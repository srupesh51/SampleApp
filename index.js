const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const messages = require('./routes/api/messages');
const users = require('./routes/api/users');
const hobseSupport = require('./routes/api/hobse_support');
const path = require('path');
const cors = require('cors')
const app = express();
const hosts = ['http://localhost:8081','http://www.hobse.com','https://yellowtruck.localtunnel.me'].join(', ');
app.use((req, res, next) => {
    console.log(res.header);
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
});

const corsOptions = {
    origin: '*',
    credentials: true };
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
app.get('/', (req,res) => {
	res.send('Hello World');	
});

app.use('/api/messages',messages);
app.use('/api/users',users);
app.use('/api/support',hobseSupport);
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}
const port = process.env.PORT;

const server = app.listen(port);

let io = module.exports.io = require('socket.io').listen(server);
//io.use('/',proxy({ target: 'http://localhost', changeOrigin: true }));
io.set('origins', hosts);
const SocketManager = require('./SocketManager')
io.on('connection', SocketManager);
