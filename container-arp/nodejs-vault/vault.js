const express = require('express');
const mustache = require('mustache-express');

const app = express();

app.use(express.static('public'));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.redirect('/authenticate');
});

app.get('/authenticate', (req, res) => {
    res.render('login');
});

app.post('/authenticate', (req, res) => {
    res.redirect('/secure')
});

app.get('/secure', (req, res) => {
    res.render('secure');
});

const server = app.listen(3000, () => console.log(`Vault UP`));

process.on('SIGTERM', () => {
    server.close();
});
