let nickname = "";
let history = [];
let aiDictionary = {
  "し": "しらす",
  "ら": "らっぱ",
  "ぱ": "ぱんだ",
  "だ": "だいこん",
  "こ": "こあら",
  "あ": "あさひ",
  "ひ": "ひまわり",
  "り": "りす",
  "す": "すずめ",
  "め": "めだか",
  "か": "かもめ",
  "も": "ももんが",
  "が": "がちょう",
  "ち": "ちず",
  "ず": "ずこう",
  "う": "うさぎ",
  "ぎ": "ぎんこう",
};

function startGame() {
  nickname = document.getElementById("nickname").value.trim();
  if (!nickname) return alert("ニックネームを入力してね！");
  document.getElementById("userInput").disabled = false;
  history = [];
  document.getElementById("log").innerHTML = "<b>しりとりスタート！</b><br>";
  document.getElementById("player-health").style.width = "100%";
  document.getElementById("ai-health").style.width = "100%";
  document.getElementById("result").textContent = "";
}

function submitWord() {
  const input = document.getElementById("userInput").value.trim();
  if (input.length < 3) return alert("3文字以上で入力してね");
  if (history.includes(input)) return alert("その単語はもう使われました");
  const lastChar = history.length ? history[history.length - 1].slice(-1) : "";
  if (lastChar && input[0] !== lastChar) return alert(`「${lastChar}」で始まる単語を入れてね`);
  if (input.endsWith("ん")) return endGame("あなたの負け！");
  addToLog(`${nickname}：${input}`);
  history.push(input);
  damage("ai");
  document.getElementById("userInput").value = "";

  setTimeout(() => {
    const aiWord = aiDictionary[input.slice(-1)];
    if (!aiWord || aiWord.endsWith("ん")) {
      return endGame("あなたの勝ち！");
    }
    addToLog(`AI：${aiWord}`);
    history.push(aiWord);
    damage("player");
  }, 1000);
}

function addToLog(text) {
  const log = document.getElementById("log");
  log.innerHTML += text + "<br>";
  log.scrollTop = log.scrollHeight;
}

function damage(target) {
  const bar = document.getElementById(target + "-health");
  const currentWidth = parseInt(bar.style.width);
  const newWidth = Math.max(currentWidth - 20, 0);
  bar.style.width = newWidth + "%";
  bar.classList.add("hit");
  setTimeout(() => bar.classList.remove("hit"), 500);
  if (newWidth <= 0) {
    endGame(target === "ai" ? "あなたの勝ち！" : "あなたの負け！");
  }
}

function endGame(msg) {
  document.getElementById("result").textContent = msg;
  document.getElementById("userInput").disabled = true;
}