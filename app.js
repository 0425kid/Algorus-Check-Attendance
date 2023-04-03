const express = require('express')
const app = express()

const path = require('path');

var http = require('http').Server(app);// create a http web server using the http library
const port = 3000

var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));


//app.use('/admin', require('./routes/admin.js'))
app.use('/user', require('./routes/user.js'))
app.use('/attendance_check', require('./routes/attendance_check.js'))

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/view/home.html'))
})

http.listen(port, () => {
    console.log(`server listening on *:${port}`)
})
