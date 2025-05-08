let history = [];
let startTime;
let nickname = "";

function startGame() {
    nickname = document.getElementById('nickname').value;
    if (!nickname) return alert('ニックネームを入力してね');
    document.getElementById('game').style.display = 'block';
    document.getElementById('nickname').disabled = true;
    startTime = Date.now();
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

    // Simulate AI response
    setTimeout(() => {
        const aiWord = input.slice(-1) + "たいけん";
        if (aiWord.endsWith("ん")) {
            endGame("あなたの勝ち！");
            return;
        }
        history.push(aiWord);
        addToHistory(aiWord);
    }, 1000);
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