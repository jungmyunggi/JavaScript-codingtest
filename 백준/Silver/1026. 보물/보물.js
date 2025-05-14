const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let A;
let B;

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else if (!A) A = line.split(" ").map(Number);
    else {
        B = line.split(" ").map(Number);
        solution(N, A, B);
        rl.close();
    }
});

function solution(N, A, B) {
    A.sort((a, b) => a - b);
    B.sort((a, b) => b - a);
    let answer = 0;
    for (let i = 0; i < N; i++) {
        answer += A.pop() * B.pop();
    }

    console.log(answer);
}
