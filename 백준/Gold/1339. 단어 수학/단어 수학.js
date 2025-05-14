const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let arr = [];

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else {
        arr.push(line.trim());
        if (arr.length === N) {
            solution(N, arr);
            rl.close();
        }
    }
});

// 1. 제일 많이나오고 자리수가 제일 큰게 가장 큰 수를 가져야함
// 2. 각 자리별로 가중치를 두고 가중치합이 높은걸 높은 수로 둬야함
// 3. 10배씩 자리수별로 가중치 커지게

function solution(N, arr) {
    const map = new Map();

    for (const word of arr) {
        word.split("").forEach((char) => {
            map.set(char, 0);
        });
    }

    for (const word of arr) {
        let w = 1;
        for (let i = word.length - 1; i >= 0; i--) {
            map.set(word[i], map.get(word[i]) + w);
            w *= 10;
        }
    }

    const temp = [...map.entries()].sort((a, b) => b[1] - a[1]);

    let i = 9;
    for (const [c, _] of temp) {
        map.set(c, `${i}`);
        i--;
    }

    let answer = 0;
    for (const word of arr) {
        let w = "";
        for (const char of word) {
            w += map.get(char);
        }
        answer += Number(w);
    }
    console.log(answer);
}
