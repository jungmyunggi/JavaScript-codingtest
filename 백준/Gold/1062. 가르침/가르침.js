// 글자 k개를 가르침
// k개의 글자로 이루어진 단어만 읽을수있음
// 모든 단어는 "anta"로 시작되고, "tica"로 끝남
// a n t i c -> 일단 K값이 5이상이 되어야 함

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, K;
let arr = [];

rl.on("line", (line) => {
    if (!N && !K) [N, K] = line.split(" ").map(Number);
    else {
        arr.push(line.trim());
        if (arr.length === N) {
            solution(N, K, arr);
            rl.close();
        }
    }
});

function getCombination(arr, N) {
    const result = [];
    function combinate(current, start) {
        if (current.length === N) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            combinate(current, i + 1);
            current.pop();
        }
    }
    combinate([], 0);
    return result;
}

// 1. 더 배울수있는 알파벳 개수 뽑기
// 2. 더 배울수 있는 알파벳 조합으로 돌려서 모든 경우의수 찾기
// 3. 해당 경우의 수에서 단어 몇개 읽을 수 있나 검사
// 4. 최대값 찾기

function solution(N, K, arr) {
    if (K < 5) {
        console.log(0);
        return;
    }
    if (K === 26) {
        console.log(N);
        return;
    }

    const alphabat = [];
    for (let i = "a".charCodeAt(); i <= "z".charCodeAt(); i++) {
        if (i === "a".charCodeAt()) continue;
        if (i === "n".charCodeAt()) continue;
        if (i === "t".charCodeAt()) continue;
        if (i === "i".charCodeAt()) continue;
        if (i === "c".charCodeAt()) continue;
        alphabat.push(String.fromCharCode(i));
    }
    const canLearn = K - 5;

    const combination = getCombination(alphabat, canLearn);

    let answer = -Infinity;
    for (const comb of combination) {
        const set = new Set();
        set.add("a");
        set.add("n");
        set.add("t");
        set.add("i");
        set.add("c");

        for (const c of comb) {
            set.add(c);
        }
        let count = 0;

        for (const a of arr) {
            let index = 0;
            while (index !== a.length) {
                if (!set.has(a[index])) break;
                index++;
            }
            if (index === a.length) count++;
        }

        answer = Math.max(answer, count);
       
    }

    console.log(answer);
}
