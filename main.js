const fs = require('fs');

const rawData = fs.readFileSync('./imslp_piano_works.json');
const pianoWorks = JSON.parse(rawData);
const randomIndex = Math.floor(Math.random() * pianoWorks.length);
const randomPianoWork = pianoWorks[randomIndex];

document.getElementById("btn").onclick = getPiece;
const display = document.getElementById("display");

function getPiece() {
  display.innerHTML = randomPianoWork.title + "\n" + randomPianoWork.url;
}
console.log(randomPianoWork);

