/* ----------  Cache DOM elements  ---------- */
const btn           = document.getElementById("submitBtn");
const resultSection = document.getElementById("result"); // <section hidden>
const titleEl       = document.getElementById("title");  // <h2 id="title">
const urlEl         = document.getElementById("url");    // <a id="url">

/* ----------  Data store  ---------- */
let pianoWorks = [];

/* ----------  Load the JSON once on page‑load  ---------- */
(async function loadPianoWorks() {
  try {
    const res = await fetch("./imslp_piano_works.json");
    pianoWorks = await res.json();

    // Enable button once data is ready
    btn.disabled = false;
  } catch (err) {
    console.error("Couldn’t load piano works:", err);
    btn.textContent = "Failed to load list 😢";
    btn.disabled = true;
  }
})();

/* ----------  Handle button clicks  ---------- */
btn.addEventListener("click", () => {
  if (!pianoWorks.length) return;          // safety guard

  const randomWork = pianoWorks[Math.floor(Math.random() * pianoWorks.length)];

  titleEl.textContent = randomWork.title;
  urlEl.href          = randomWork.url;
  urlEl.textContent   = "Open on IMSLP";

  resultSection.hidden = false;            // reveal the result card
});
