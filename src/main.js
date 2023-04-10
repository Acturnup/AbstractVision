import './styles/style.css'

// sketch.js
let searchInput;
let searchButton;

let song;
let fft;

function setup() {
  createCanvas(400, 400);
  searchInput = select('#searchInput');
  searchButton = select('#searchButton');
  searchButton.mousePressed(searchAndPlay);

  fft = new p5.FFT();
}

function draw() {
  background(220);

  if (song && song.isPlaying()) {
    let spectrum = fft.analyze();
    // Your audio-reactive drawing code using the spectrum data
  }
}

function searchAndPlay() {
  let query = searchInput.value();
  let proxyUrl = 'https://whispering-lake-65266.herokuapp.com/';
  let url = `${proxyUrl}https://api.deezer.com/search?q=${query}`;
  let preview;
  let mp3Link;
  let previewLink;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      preview = data.data[0].preview
      if (preview) {
        if (song) {
          song.stop();
        }

        const proxyPreview = `${proxyUrl}${preview}`
        song = loadSound(proxyPreview, () => song.play());
      } else {
        console.log('No preview available for this track.');
      }
    })
    .catch(error => console.error('Error fetching track data:', error));
}

