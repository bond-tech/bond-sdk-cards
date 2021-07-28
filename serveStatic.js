const express = require('express');
const app = express();

app.use(express.static('public'));

app.use('/', express.static(__dirname + '/build'));

app.listen(8080);
