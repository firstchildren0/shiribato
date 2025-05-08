let history = [];
let startTime;
let nickname = "";

const aiDictionary = {
    "し": "しまうま",
    "ま": "まつり",
    "り": "りす",
    "す": "すもう",
    "う": "うさぎ",
    "ぎ": "ぎんこう",
    "こ": "こうえん",
    "ん": null,
    "に": "にんぎょ",
    "ょ": "ようせい",
    "い": "いちご",
    "ご": "ごりら",
    "ら": "らいおん",
    "ん": null,
    "お": "おにぎり",
    "き": "きつね",
    "ね": "ねこ",
    "こ": "こまつな",
    "な": "なすび",
    "び": "びーだま",
    "た": "たいやき",
    "け": "けしごむ",
    "む": "むしめがね"
};

function startGame() {
    nickname = document.getElementById('nickname').value;
    if (!nickname) return alert('ニックネームを入力してね');
    document.getElementById('game').style.display = 'block';
    document.getElementById('nickname').disabled = true;
    startTime = Date.now();
    history = [];
    document.getElementById('result').textContent = "";
    document.getElementById('history').innerHTML = "";
    document.getElementById('userInput').disabled = false;
    addToHistory("しりとりスタート！");
}

function submitWord() {
    const input = document.getElementById('userInput').value.trim();
    if (input.length < 4) return alert('4文字以上で入力してね');
    const lastChar = history.length ? history[history.length - 1].slice(-1) : "";
    if (lastChar && input[0] !== lastChar) return alert(`「${lastChar}」で始まる単語を入れてね`);
    if (history.includes(input)) return alert('その単語はもう使われました');
    if (input.endsWith("ん")) {
        endGame("あなたの負け！");
        return;
    }
    history.push(input);
    addToHistory(input);
    document.getElementById('userInput').value = "";

    // AIの返答
    setTimeout(() => {
        const aiWord = aiDictionary[input.slice(-1)];
        if (!aiWord || aiWord.endsWith("ん")) {
            endGame("あなたの勝ち！");
            return;
        }
        history.push(aiWord);
        addToHistory(aiWord);
    }, 800);
}

function addToHistory(text) {
    const div = document.createElement('div');
    div.textContent = text;
    document.getElementById('history').appendChild(div);
}

function endGame(result) {
    const time = ((Date.now() - startTime) / 1000).toFixed(2);
    document.getElementById('result').textContent = result + `（タイム：${time}秒）`;
    document.getElementById('userInput').disabled = true;
}