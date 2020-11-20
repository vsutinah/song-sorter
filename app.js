const axios = require('axios'), 
    ejsMate = require('ejs-mate'),
    express = require('express'),
    path = require('path'),
    app = express();

const clientID = 'e1c1fa5ca9af45b39bb13a8382b027ed';
const redirectURI = encodeURIComponent('https://localhost:3000/callback/');
const spotifyURI = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}`;

// EJS & path setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set default path for views to '/views'

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.redirect(spotifyURI);
})

app.get('/callback', (req, res) => {
    res.render('callback');
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})

// API URI to use for testing: https://api.spotify.com/v1/playlists/5fvYabKVo5OK9iLzw1kgnu // Access playlist