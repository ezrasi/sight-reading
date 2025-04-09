

document.getElementById("submitBtn").onclick = getPiece;
const display = document.getElementById("display");

async function getPiece() {
  const response = await fetch('./imslp_piano_works.json'); 
  const pianoWorks = await response.json();
  const randomIndex = Math.floor(Math.random() * pianoWorks.length);
  const randomPianoWork = pianoWorks[randomIndex];

  display.innerHTML = randomPianoWork.title + "\n" + randomPianoWork.url;
}
console.log(randomPianoWork);

