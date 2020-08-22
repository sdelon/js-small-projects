const form = document.querySelector('form')
const search = document.querySelector('#search')
const keyword = document.querySelector('#keyword')
const listContainer = document.querySelector('#list-container')
const songContainer = document.querySelector('#song-container')
const getLyrics = document.querySelector('#get-lyrics')
const more = document.querySelector('#more')

async function getListOfSongs(e, searchValue) {
    e.preventDefault()
    searchValue = keyword.value
    if(searchValue.trim()) {
        try {
            const res = await fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
            const results = await res.json()
            showList(results)
        } catch(err) {
            console.log(err)
        }
    } else {
        listContainer.innerHTML = `<p>Please enter an artist or a song title</p>`
    }
}

const showList = results => {
    songContainer.innerHTML = ''
    listContainer.innerHTML = results.data.map(song => `
    <ul>
        <li>
            <p class="band">${song.artist.name}<span class="title"> - ${song.title}</span><em><span class="album"> (${song.album.title.length > 30 ? song.album.title = `${song.album.title.slice(0, 30)}...` : song.album.title})</span></em></p>
            <button onclick="getLyricsFromBtn('${song.artist.name}/${song.title}')" class="primary-btn" id="get-lyrics">Get Lyrics</button>
        </li>
    </ul>
    `).join('')

    if(results.prev || results.next) {
        more.style.visibility = 'visible'
        more.innerHTML = `${results.prev ? `<button class="primary-btn" onclick="getPagination('${results.prev}')">Prev</button>` : ''}
          ${results.next ? `<button class="primary-btn" onclick="getPagination('${results.next}')">Next</button>` : ''} `;
      } else {
        more.innerHTML = '';
      }
}

async function getPagination(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const results = await res.json();  
    showList(results);
}

const showLyrics = (lyrics, songid) => {
    if(lyrics.lyrics === undefined) {
        listContainer.innerHTML = `We don't know the lyrics for <strong>${songid}</strong>. Please check for another song`
    } else {
        let artist = songid.split('/')
        listContainer.innerHTML = ''
        songContainer.innerHTML = `<p class="band">${artist[0]}<span class="title"> - ${artist[1]}</span></p>
        <p class="lyrics">${lyrics.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')}</p>`
    }
}

async function getLyricsFromBtn(songid) {
    try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${songid}`)
        const lyrics = await res.json()
        showLyrics(lyrics, songid)
    } catch(err) {
        console.log(err)
    }
}

form.addEventListener('submit', getListOfSongs)