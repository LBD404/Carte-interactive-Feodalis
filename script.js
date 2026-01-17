const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQz9C26GIE30pGGxPGhsow_teQePVLbol9b5etVDkQMc_R4vYUGDckbwpZqj0HQOdIzca1W6X_Wu8ZR/pub?gid=1101898628&single=true&output=tsv";

let data = [];

fetch(sheetURL)
  .then(r => r.text())
  .then(text => {
    data = text.split("\n").map(r => r.split("\t"));
  });

const tooltip = document.getElementById("tooltip");
let current = null;

document.querySelectorAll(".marker").forEach(marker => {
  marker.addEventListener("click", e => {

    if (current === marker) {
      tooltip.style.display = "none";
      current = null;
      return;
    }

    current = marker;
    const maison = marker.dataset.maison;
    const row = data.find(r => r[1]?.trim() === maison);

    tooltip.innerHTML = row
      ? `<strong>${row[1]}</strong><br>${row[5]}<br>${row[6]}<br>${row[7]}`
      : `<strong>${maison}</strong><br>Données absentes`;

    const rect = marker.getBoundingClientRect();
    const mapRect = document.getElementById("map-container").getBoundingClientRect();

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y - 10}px`;
    tooltip.style.display = "block";
  });
});
