let cardCount = 8;
let shuffleCard;
let child = [];
let count = 0;
let selectCard = [];
let html;
let backTimer;
let pareCount = 0;

let currentPlayer = 1;
let player1Point = 0;
let player2Point = 0;

const nextPlayer = document.getElementById("nextPlayer");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const button = document.getElementById("button");

nextPlayer.textContent = `次はPlayer${currentPlayer}の番です`;
player1.textContent = `Player1:${player1Point}`;
player2.textContent = `Player2:${player2Point}`;
window.onload = function () {
  let array = [];

  //**ペアの数字を生成**/
  for (var i = 0; i < 4; i++) {
    array.push(i);
    array.push(i);
  }

  array = shuffle(array);
  console.log(array);

  const panel = document.getElementById("panel");

  //**カードの生成**/
  for (let i = 0; i < cardCount; i++) {
    const div = document.createElement("div");
    div.className = "card back";
    div.number = array[i];
    div.innerHTML = "";
    div.addEventListener("click", turn);
    panel.appendChild(div);
  }
};

button.addEventListener("click", function () {
  window.location.reload();
});
//**配列のシャッフル**/
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//**対戦結果**/
const result = () => {
  if (player1Point === player2Point) {
    return "引き分け";
  } else if (player1Point > player2Point) {
    return "player1の勝ち";
  } else {
    return "player2の勝ち";
  }
};

function turn(e) {
  count += 1;
  let card = e.target;
  let num = card.number;
  card.className = "card none";
  card.innerHTML = num;

  if (currentPlayer === 2) {
    currentPlayer = 1;
  }

  //**1枚目,2枚目の処理**/
  if (count === 1) {
    selectCard.push(card.innerHTML);
    html = card;
  } else if (count === 2) {
    selectCard.push(card.innerHTML);
    if (selectCard[0] === selectCard[1]) {
      if (currentPlayer === 1) {
        player1Point++;
        player1.textContent = `Player1:${player1Point}`;
      } else {
        player2Point++;
        player2.textContent = `Player2:${player2Point}`;
      }
      backTimer = setTimeout(function () {
        card.className = "card finish none";
        html.className = "card finish none";
        count = 0;
      }, 500);
      selectCard = [];
      pareCount++;
    } else {
      backTimer = setTimeout(function () {
        card.className = "card back";
        html.className = "card back";
        card.innerHTML = "";
        html.innerHTML = "";
        count = 0;
      }, 500);
      selectCard = [];
      currentPlayer++;
      nextPlayer.textContent = `次はPlayer${currentPlayer}の番です`;
    }
  } else {
    card.className = "card back";
    html.className = "card back";
    card.innerHTML = "";
    html.innerHTML = "";
  }
  console.log(count);
  if (currentPlayer === 2) {
    currentPlayer = 0;
  }
  if (pareCount === 4) {
    result();
    backTimer = setTimeout(function () {
      alert(`終了です。${result()}`);
      location.reload();
    }, 500);
  }
}
