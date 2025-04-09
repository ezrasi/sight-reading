
let pianoWorks = [];
document.getElementById("submitBtn").onclick = getPiece;
const display = document.getElementById("display");


async function loadPianoWorks() {
  const response = await fetch('./imslp_piano_works.json'); 
  pianoWorks = await response.json();
  console.log("Piano works have loaded");
}

async function getPiece() {
  const randomIndex = Math.floor(Math.random() * pianoWorks.length);
  const randomPianoWork = pianoWorks[randomIndex];

  display.innerHTML = `<h3>Title</h3> <br> ${randomPianoWork.title} <br> <h3>URL</h3><br> 
                        <a href="${randomPianoWork.url}" target="_blank">${randomPianoWork.url}</a>`;
}

loadPianoWorks();
