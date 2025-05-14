const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, M;
let map = [];

rl.on("line", (line) => {
    if (!N && !M) {
        [N, M] = line.split(" ").map(Number);
    } else {
        map.push(line.split(" ").map(Number));
        if (map.length === N) {
            solution(N, M, map);
            rl.close();
        }
    }
});

const d = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

function solution(N, M, map) {
    // map을 하나씩 살펴보다가 빙산을 만나면 녹이는 함수
    function meltMap() {
        const temp = Array.from({ length: N }, () => Array(M).fill(0));
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < M; col++) {
                if (map[row][col] !== 0) {
                    let count = 0;
                    for (const [dr, dc] of d) {
                        const newRow = dr + row;
                        const newCol = dc + col;
                        if (map[newRow][newCol] === 0) {
                            count++;
                        }
                    }
                    temp[row][col] = Math.max(0, map[row][col] - count);
                }
            }
        }
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                map[i][j] = temp[i][j];
            }
        }
    }
    // 두덩이가 되었는지 확인하는 함수
    function checkIce() {
        let hasIce = false;
        const visited = Array.from({ length: N }, () => Array(M).fill(false));
        const queue = [];
        let queueIndex = 0;
        let start = null;
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < M; col++) {
                if (map[row][col] !== 0) {
                    start = [row, col];
                    hasIce = true;
                }
            }
        }

        if (hasIce === false) {
            return -1;
        }

        queue.push(start);
        visited[start[0]][start[1]] = true;

        while (queue.length !== queueIndex) {
            const [cr, cc] = queue[queueIndex++];

            for (const [dr, dc] of d) {
                const newRow = dr + cr;
                const newCol = dc + cc;
                if (map[newRow][newCol] !== 0 && !visited[newRow][newCol]) {
                    visited[newRow][newCol] = true;
                    queue.push([newRow, newCol]);
                }
            }
        }
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < M; col++) {
                if (visited[row][col] === false && map[row][col] > 0) {
                    return 1;
                }
            }
        }
        return 0;
    }

    let year = 0;
    while (true) {
        const c = checkIce();
        if (c === 1) {
            console.log(year);
            break;
        } else if (c === -1) {
            console.log(0);
            break;
        }
        year++;
        meltMap();
    }
}
