const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let T;
let n = [];
let arr = [];
let tempArr = [];
let tc = 0;
let tr = 0;
rl.on("line", (line) => {
    if (!T) T = Number(line);
    else if (!n[tc]) {
        n.push(Number(line));
    } else {
        tempArr.push(line.split(" ").map(Number));
        tr++;
        if (tr === 2) {
            arr.push([...tempArr]);
            tempArr.length = 0;
            tr = 0;
            tc++;
            if (tc === T) {
                solution(T, n, arr);
                rl.close();
            }
        }
    }
});

function solution(T, n, arr) {
    for (let TC = 0; TC < T; TC++) {
        const N = n[TC];
        const stickers = arr[TC];
        const dp = Array.from({ length: 2 }, () => Array(N).fill(0));
        dp[0][0] = stickers[0][0];
        dp[1][0] = stickers[1][0];
        dp[0][1] = dp[1][0] + stickers[0][1];
        dp[1][1] = dp[0][0] + stickers[1][1];
        for (let col = 2; col < N; col++) {
            dp[0][col] =
                Math.max(dp[1][col - 2], dp[1][col - 1]) + stickers[0][col];
            dp[1][col] =
                Math.max(dp[0][col - 2], dp[0][col - 1]) + stickers[1][col];
        }
        console.log(Math.max(dp[0][N - 1], dp[1][N - 1]));
    }
}
