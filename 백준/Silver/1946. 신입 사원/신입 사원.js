const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 서류, 면접 두가지가 있음
// 어떤 지원자 A가 다른 지원자 B보다 두개 모두 성적이 떨어진다면 안뽑음
// 뭐라도 하나 높다면 뽑음

let T;
let N = [];
let arr = [];
let Tc = 0;

rl.on("line", (line) => {
    if (!T) T = Number(line);
    else if (!N[Tc]) {
        N[Tc] = Number(line);
        arr[Tc] = [];
    } else {
        arr[Tc].push(line.split(" ").map(Number));
        if (arr[Tc].length === N[Tc]) {
            Tc++;
            if (T === Tc) {
                solution(T, N, arr);
                rl.close();
            }
        }
    }
});

function solution(T, N, arr) {
    const answer = [];
    for (let Test = 0; Test < T; Test++) {
        const n = N[Test];
        const people = arr[Test];

        people.sort((a, b) => a[0] - b[0]);

        let result = 0;
        let minI = people[0][1];
        for (let i = 1; i < n; i++) {
            const [_, ci] = people[i];
            if (ci < minI) {
                minI = ci;
                continue;
            }
            result++;
        }
        answer.push(n - result);
    }
    console.log(answer.join("\n"));
}
