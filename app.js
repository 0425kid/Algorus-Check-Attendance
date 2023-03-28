const express = require('express')
const app = express()

const path = require('path');

var http = require('http').Server(app);// create a http web server using the http library
const port = 3000

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.json());

const set = require(path.join(__dirname + '/vanila_module/setting.js'));
const json = require('./data/sample.json');

app.use('/admin', require('./routes/admin.js'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'))
})

http.listen(port, () => {
    console.log(`server listening on *:${port}`)
    set.addMembers(json);
})