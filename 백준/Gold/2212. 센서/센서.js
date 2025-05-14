// 고속도로에 N개의 센서 설치
// 집중국을 세워야함 -> K개
// 센서는 하나 이상의 집중국과 통신해야함
// 집중국 수신가능 영역의 길이 합이 최소가 되어야함

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, K;
let arr;

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else if (!K) K = Number(line);
    else {
        arr = line.split(" ").map(Number);
        solution(N, K, arr);
        rl.close();
    }
});

function findMailCenter(target, arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return arr[mid];
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }

    if (left === 0) return arr[0];
    if (left === arr.length) return arr[arr.length - 1];

    const temp1 = arr[left];
    const temp2 = arr[left - 1];

    if (Math.abs(temp1 - target) <= Math.abs(temp2 - target)) {
        return temp1;
    }
    return temp2;
}

function solution(N, K, arr) {
    arr.sort((a, b) => a - b);

    const temp = [];

    for (let i = 0; i < arr.length - 1; i++) {
        temp.push(arr[i + 1] - arr[i]);
    }

    temp.sort((a, b) => a - b);

    for (let i = 0; i < K - 1; i++) {
        temp.pop();
    }

    const answer = temp.reduce((acc, cur) => acc + cur, 0);

    console.log(answer);
}
