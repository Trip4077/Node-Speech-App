const apiai = require('apiai')(process.env.TOKEN || '7b0b706f901e43eb915741eb12c2bcb8');

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

const server = app.listen(process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('chat message', text => {
        const apiaiReq = apiai.textRequest(text, {
            sessionId: process.env.SESSION || request.body.sessionId
        });

        apiaiReq.on('response', response => {
            const aiText = response.result.fulfillment.speech;
            socket.emit('bot reply', aiText);
        });

        apiaiReq.on('error', err => {
            console.log('error', err);
        });

        apiaiReq.end();
    });
});