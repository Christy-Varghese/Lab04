// Name: Christy Varghese
// Student ID: 1082636
// Course: INFO 6128
// Date: 08 Oct 2022
// Professor: Marcelo Hespanhol
// Lab 02
// Link:  https://christy-varghese.github.io/PWA/

var title = document.getElementById("title");
var artist = document.getElementById("artist");
let store = [] // array to store the songs locally



// validating the two fields
function validate() {
    if (title.value == "" || artist.value == "") {
        return false;
    }
    return true;
    
}

// adding music to the playlist
var addMusic = document.getElementById("add_btn");
addMusic.addEventListener("click", addSong);

// Adding songs into a local storage
function addSong() {
    if (validate()) {
        var song = {
            title: title.value,
            artist: artist.value
        }
        store.push(song);
        // console.log(store);
        displaySongs();
    }
}

// display the songs on the page
function displaySongs() {
    var songList = document.getElementById("list-song-container");
    // console.log(songList);
    if(songList) {;
        for (var i = 0; i < store.length; i++) {
        songList.innerHTML += `<div class="list-songs"> 
        <h2 class="list-song-title">${store[i].title}</h2>
        <h4 class="list-song-artist">${store[i].artist}</h4>
        </div>`;
        store.pop(store[i]);
        clearFields();
        }
    }
    else{
        console.log("songList is null");
    }
}

// clear the fields after adding a song
function clearFields() {
    title.value = "";
    artist.value = "";
}   


// service worker
// console.log("Service Worker Loaded...");
// console.log("navigator", navigator);
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service_worker.js', {scope: '/PWA/'})
        .then((reg) => {
            console.log('Service worker registered.', reg);
        })
        .catch((err) => {
            console.log('Service worker registration failed.', err);
        });
    });
}
else {
    console.log('Service worker not supported.');
}
