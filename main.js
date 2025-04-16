/* ----------  Cache DOM elements  ---------- */
const soloPianoBtn        = document.getElementById("soloPianoBtn");
const featuringPianoBtn   = document.getElementById("featuringPianoBtn");
const arrangedForPianoBtn = document.getElementById("arrangedForPianoBtn"); // Already cached
const forKeyboardBtn      = document.getElementById("forKeyboardBtn");
const pieceType           = document.getElementById("pieceType");
const resultSection       = document.getElementById("result");
const titleEl             = document.getElementById("title");
const urlEl               = document.getElementById("url");

/* ----------  Data store  ---------- */
let soloPianoWorks = [];
let featuringPianoWorks = [];
let arrangedForPianoWorks = []; 
let keyboardWorks = [];

/* ---------- Disable buttons initially ---------- */
soloPianoBtn.disabled = true;
featuringPianoBtn.disabled = true;
arrangedForPianoBtn.disabled = true; // Disable the new button initially
forKeyboardBtn.disabled = true;
soloPianoBtn.textContent = "Loading...";
featuringPianoBtn.textContent = "Loading...";
arrangedForPianoBtn.textContent = "Loading..."; // Set loading text for the new button
forKeyboardBtn.textContent = "Loading..."; // Set loading text for the new button

/* ----------  Load the JSON data once on page-load  ---------- */
(async function loadAllWorks() {
  const soloPianoPath = "./imslp_piano_works.json";
  const featuringPianoPath = "./featuring_piano.json";
  const arrangedPianoPath = "./arranged_for_piano.json"; // Added path for the third JSON
  const forKeyboardPath = "./keyboard_works.json"

  try {
    // Fetch all three JSON files concurrently
    const results = await Promise.allSettled([
      // Fetch solo piano
      fetch(soloPianoPath).then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status} for ${soloPianoPath}`);
        return res.json();
      }),
      // Fetch featuring piano
      fetch(featuringPianoPath).then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status} for ${featuringPianoPath}`);
        return res.json();
      }),
      // Fetch arranged for piano
      fetch(arrangedPianoPath).then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status} for ${arrangedPianoPath}`);
        return res.json();
      }),
      fetch(forKeyboardPath).then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status} for ${forKeyboardPath}`);
        return res.json();
      }),
    ]);

    // Process result for solo piano works (results[0])
    if (results[0].status === 'fulfilled') {
      soloPianoWorks = results[0].value;
      soloPianoBtn.disabled = false;
      soloPianoBtn.textContent = "Solo Piano"; // Use concise text
      console.log("Solo piano works loaded successfully.");
    } else {
      console.error("Couldn’t load solo piano works:", results[0].reason);
      soloPianoBtn.textContent = "Load Failed";
      soloPianoBtn.disabled = true;
    }

    // Process result for featuring piano works (results[1])
    if (results[1].status === 'fulfilled') {
      featuringPianoWorks = results[1].value;
      featuringPianoBtn.disabled = false;
      featuringPianoBtn.textContent = "Featuring Piano"; // Use concise text
      console.log("Featuring piano works loaded successfully.");
    } else {
      console.error("Couldn’t load featuring piano works:", results[1].reason);
      featuringPianoBtn.textContent = "Load Failed";
      featuringPianoBtn.disabled = true;
    }

    // Process result for arranged for piano works (results[2]) - New block
    if (results[2].status === 'fulfilled') {
      arrangedForPianoWorks = results[2].value;
      arrangedForPianoBtn.disabled = false; // Enable the new button
      arrangedForPianoBtn.textContent = "Arranged for Piano"; // Set final text
      console.log("Arranged for piano works loaded successfully.");
    } else {
      console.error("Couldn’t load arranged for piano works:", results[2].reason);
      arrangedForPianoBtn.textContent = "Load Failed"; // Update button text
      arrangedForPianoBtn.disabled = true; // Keep disabled
    }

    if (results[3].status === 'fulfilled') {
      keyboardWorks = results[3].value;
      forKeyboardBtn.disabled = false; // Enable the new button
      forKeyboardBtn.textContent = "Solo Keyboard"; // Set final text
      console.log("Solo Keyboard loaded successfully.");
    } else {
      console.error("Couldn’t load solo keyboard works:", results[3].reason);
      forKeyboardBtn.textContent = "Load Failed"; // Update button text
      forKeyboardBtn.disabled = true; // Keep disabled
    }

  } catch (err) {
    // General error handler
    console.error("An unexpected error occurred during loading:", err);
    // Ensure all buttons show failed state if they haven't loaded
    if (soloPianoBtn.disabled) soloPianoBtn.textContent = "Load Failed";
    if (featuringPianoBtn.disabled) featuringPianoBtn.textContent = "Load Failed";
    if (arrangedForPianoBtn.disabled) arrangedForPianoBtn.textContent = "Load Failed"; // Include new button here
  }
})();

/* ----------  Helper function to display results ---------- */
function displayResult(work) {
  // Ensure work is not undefined or null before accessing properties
  if (!work) {
      console.error("Attempted to display an invalid work object.");
      // Optionally update the UI to show an error
      titleEl.textContent = "Error: Could not display work.";
      urlEl.href = "#";
      urlEl.textContent = "";
      resultSection.hidden = false;
      return;
  }
  titleEl.textContent = work.title;
  urlEl.href          = work.url;
  urlEl.textContent   = "Open on IMSLP";
  resultSection.hidden = false; // reveal the result card
}


/* ----------  Handle button clicks  ---------- */

// Listener for Solo Piano Button
soloPianoBtn.addEventListener("click", () => {
  if (!soloPianoWorks.length) return;
  const randomWork = soloPianoWorks[Math.floor(Math.random() * soloPianoWorks.length)];
  pieceType.innerHTML = "<u>Piece for Solo Piano:</u>"; 
  displayResult(randomWork);
});

// Listener for Featuring Piano Button
featuringPianoBtn.addEventListener("click", () => {
  if (!featuringPianoWorks.length) return;
  const randomWork = featuringPianoWorks[Math.floor(Math.random() * featuringPianoWorks.length)];
  pieceType.innerHTML = "<u>Piece Featuring Piano:</u>"; 
  displayResult(randomWork);
});

// Listener for Arranged For Piano Button - New listener
arrangedForPianoBtn.addEventListener("click", () => {
  if (!arrangedForPianoWorks.length) return; // Use the new data array
  const randomWork = arrangedForPianoWorks[Math.floor(Math.random() * arrangedForPianoWorks.length)];
  pieceType.innerHTML = "<u>Piece Arranged For Piano:</u>"; 
  displayResult(randomWork);
});

forKeyboardBtn.addEventListener("click", () => {
  if (!keyboardWorks.length) return; // Use the new data array
  const randomWork = keyboardWorks[Math.floor(Math.random() * keyboardWorks.length)];
  pieceType.innerHTML = "<u>Piece for Solo Keyboard:</u>"; 
  displayResult(randomWork);
});