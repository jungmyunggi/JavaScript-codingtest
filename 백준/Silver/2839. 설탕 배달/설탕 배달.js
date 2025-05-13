// 1. 설탕을 정확히 N킬로 배달
// 2. 봉지는 3키로 5키로 두개
// 3. 봉지수가 적어야함
// 4. 정확히 N 키로가 안대면 -1 출력

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;

rl.on("line", (line) => {
    N = Number(line);
    solution(N);
    rl.close();
});

function solution(N) {
    const dp = Array(N + 1).fill(Infinity);
    dp[0] = 0;
    dp[3] = 1;
    dp[5] = 1;
    for (let i = 0; i <= N; i++) {
        if (dp[i] === Infinity) continue;
        if (i + 3 <= N) dp[i + 3] = Math.min(dp[i] + 1, dp[i + 3]);
        if (i + 5 <= N) dp[i + 5] = Math.min(dp[i] + 1, dp[i + 5]);
    }
    console.log(dp[N] === Infinity ? -1 : dp[N]);
}
