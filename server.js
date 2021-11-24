const express = require('express');
const path = require('path');
config = require('config')

const PORT = config.get('PORT') || 3000;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT,()=>console.log(`Приложение запущено на порту ${PORT}...`));