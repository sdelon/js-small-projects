// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;
const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '3d2bec30d22d42c195df8b29521d72f0';
const redirectUri = 'http://127.0.0.1:5500/audio-spotify-player/index.html';
const scopes = [
  'user-top-read'
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

// DOM Events
const form = document.querySelector('form')
const search = document.querySelector('#search')
const songsTitle = document.querySelector('#songs-title')
const spotifyBH = 'https://api.spotify.com/v1/artists/45lorWzrKLxfKlWpV7r9CN/top-tracks?country=US'

async function loadSongsArray(e) {
    e.preventDefault()
    searchValue = search.value
    console.log(searchValue)
    try {
        const res = await fetch(`https://api.spotify.com/v1/search?q=name:${searchValue}&type=tracks`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + _token
            }
        })
        const data = await res.json()
        console.log(data)
        data.forEach(song => {
            songsTitle.innerHTML += `
            <div class='song-info'>
                <h5>Title of Song</h5>
                <p>${song.name}</p>
                <a href="${song.external_urls.spotify}" target="_blanck" rel="noopener">Lire</a>
            </div>
        `
        })
    } catch(err) {
        console.log(err)
    }
}

const updateDOMWithSong = (img, title) => {
    imgCover.src = img
    titleTrack.textContent = title
}

form.addEventListener('submit', loadSongsArray)
