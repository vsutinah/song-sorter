require('dotenv').config();

const axios = require('axios'), 
    ejsMate = require('ejs-mate'),
    express = require('express'),
    path = require('path'),
    app = express();

const clientID = process.env.SPOTIFY_CLIENT_ID;
const redirectURI = encodeURIComponent(process.env.REDIRECT_URI);
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
    const code = req.query.code;
    console.log(code);
    axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectURI
    })
    .then(() => {
        res.redirect('/success');
    })
})

app.get('/success', (req, res) => {
    res.render('callback')
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})

// API URI to use for testing: https://api.spotify.com/v1/playlists/5fvYabKVo5OK9iLzw1kgnu // Access playlist