const express = require('express');
const app = express();

app.use(express.static(_dirname + '/views'));
app.use(express.static(_dirname + '/public'));

const server = app.listen(process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.sendFile('index.html');
});