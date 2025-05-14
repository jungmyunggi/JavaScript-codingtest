const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, K;
let arr;

rl.on("line", (line) => {
    if (!N && !K) {
        [N, K] = line.split(" ").map(Number);
    } else {
        arr = line.split(" ").map(Number);
        solution(N, K, arr);
        rl.close();
    }
});

// 올리는 위치는 0번 인덱스
// 내리는 위치는 N-1번 인덱스
// 2N이 되면 0번으로 돌아감
// N-1인덱스에 로봇이 도착하면 즉시 내린다
// 즉 2N - 1 부터 N 까지 칸에는 로봇이 없음
// 무조건 N-1에 가까운 로봇이 최신 로봇 아닌가..?

// 1. 벨트 한칸 회전
// 2. 먼저 올라간 로봇부터 한칸씩 이동 -> 이동할 칸에 다른 로봇이 있으면 가만히 : 움직이고 나면 해당 위치의 내구도는 -1
// 3. 올리는 위치에 로봇을 올림 : 올리고 나면 해당 위치의 내구도는 -1
// 4. 내구도가 0인 칸이 K개 이상이면 멈춤

function solution(N, K, arr) {
    let round = 1; // 지금 진행중인 단계
    let count = 0; // 컨베이어 벨트의 내구도가 0인 개수

    let upIndex = 0; //  올리는 위치
    let downIndex = N - 1; //  내리는 위치

    const belt = Array(2 * N);
    const robots = Array(2 * N).fill(false);
    for (let i = 0; i < 2 * N; i++) {
        belt[i] = arr[i];
    }

    while (count < K) {
        // 1. 벨트 회전
        belt.unshift(belt.pop());
        robots.unshift(robots.pop());

        robots[downIndex] = false;

        // 2. 로봇 이동
        for (let i = N - 2; i >= 0; i--) {
            const hasRobot = robots[i];
            if (!hasRobot) continue;

            const durability = belt[i + 1];
            if (durability > 0 && robots[i + 1] === false) {
                belt[i + 1] -= 1;
                if (belt[i + 1] === 0) {
                    count++;
                }
                robots[i + 1] = robots[i];
                robots[i] = false;
            }
            robots[downIndex] = false;
        }

        // 3. 로봇 추가
        if (belt[upIndex] > 0) {
            robots[upIndex] = true;
            belt[upIndex] -= 1;
            if (belt[upIndex] === 0) {
                count++;
            }
        }

        round++;
    }
    console.log(round - 1);
}
