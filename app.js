const players = [
  { name: "LeBron James", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" },
  { name: "Stephen Curry", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png" },
  { name: "Kevin Durant", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png" },
  { name: "Giannis Antetokounmpo", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png" },
  { name: "Nikola Jokic", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png" },
  { name: "Luka Doncic", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png" },
  { name: "Jayson Tatum", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png" },
  { name: "Joel Embiid", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/203954.png" },
  { name: "Jimmy Butler", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/202710.png" },
  { name: "Kawhi Leonard", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/202695.png" },
  { name: "Devin Booker", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1626164.png" },
  { name: "Ja Morant", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1629630.png" },
  { name: "Trae Young", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1629027.png" },
  { name: "Shai Gilgeous-Alexander", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png" },
  { name: "Anthony Edwards", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1630162.png" },
  { name: "Victor Wembanyama", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1641705.png" },
  { name: "Damian Lillard", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/203081.png" },
  { name: "Kyrie Irving", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png" },
  { name: "Donovan Mitchell", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628378.png" },
  { name: "Jaylen Brown", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627759.png" },
  { name: "Paolo Banchero", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1631094.png" },
  { name: "Tyrese Haliburton", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1630169.png" },
  { name: "Domantas Sabonis", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627734.png" },
  { name: "De'Aaron Fox", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628368.png" },
  { name: "LaMelo Ball", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1630163.png" },
  { name: "Zion Williamson", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1629627.png" },
  { name: "Brandon Ingram", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627742.png" },
  { name: "Bam Adebayo", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628389.png" },
  { name: "Jamal Murray", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627750.png" },
  { name: "Karl-Anthony Towns", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1626157.png" },
  { name: "Paul George", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/202331.png" },
  { name: "James Harden", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/201935.png" }
];

const roundText = document.getElementById("roundText");
const matchSection = document.getElementById("matchSection");
const winnerSection = document.getElementById("winnerSection");
const winnerName = document.getElementById("winnerName");
const winnerImage = document.getElementById("winnerImage");
const restartBtn = document.getElementById("restartBtn");

let currentRound = [];
let nextRound = [];
let pickCount = 0;

const shuffle = (arr) => {
  const copied = [...arr];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
};

function updateRoundText() {
  roundText.textContent = `${currentRound.length}강`;
}

function renderMatch() {
  matchSection.innerHTML = "";

  const index = pickCount * 2;
  const left = currentRound[index];
  const right = currentRound[index + 1];

  [left, right].forEach((player) => {
    const button = document.createElement("button");
    button.className = "card";
    button.type = "button";
    button.innerHTML = `
      <img src="${player.image}" alt="${player.name}" loading="lazy" />
      <span class="name">${player.name}</span>
    `;
    button.addEventListener("click", () => choosePlayer(player));
    matchSection.appendChild(button);
  });
}

function choosePlayer(player) {
  nextRound.push(player);
  pickCount += 1;

  if (pickCount * 2 >= currentRound.length) {
    if (nextRound.length === 1) {
      showWinner(nextRound[0]);
      return;
    }
    currentRound = nextRound;
    nextRound = [];
    pickCount = 0;
    updateRoundText();
  }

  renderMatch();
}

function showWinner(player) {
  matchSection.classList.add("hidden");
  winnerSection.classList.remove("hidden");
  roundText.textContent = "결승 종료";
  winnerName.textContent = player.name;
  winnerImage.src = player.image;
}

function startGame() {
  currentRound = shuffle(players);
  nextRound = [];
  pickCount = 0;

  winnerSection.classList.add("hidden");
  matchSection.classList.remove("hidden");

  updateRoundText();
  renderMatch();
}

restartBtn.addEventListener("click", startGame);
startGame();
