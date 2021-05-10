let cardCount = 8;
let shuffleCard;
let child = [];

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
    div.onclick = turn;
    panel.appendChild(div);
    child.push(div);
  }
};

//**配列のシャッフル**/
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//console.log(div);

function turn(e) {
  let card = e.target;
  let num = card.number;
  card.className = "card";
  card.innerHTML = num;
  //**1枚目の処理**/
}
