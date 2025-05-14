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
// 치킨집 M개 남기고 폐업하는 모든 경우의 수를 구해서 치킨거리가 가장 짧은 치킨거리 반환
// 치킨거리는 칸당 1씩 증가 상하좌우만 움직임 가능
function getCombination(arr, M) {
    const result = [];

    function combinate(current, start) {
        if (current.length === M) {
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
function calc(N, houses, reamin) {
    let result = 0;
    for (const h of houses) {
        const houseRow = h[0];
        const houseCol = h[1];
        let range = Infinity;
        for (const r of reamin) {
            const remainRow = r[0];
            const remainCol = r[1];

            let temp1 = houseRow - remainRow;
            let temp2 = houseCol - remainCol;

            temp1 = temp1 < 0 ? -temp1 : temp1;
            temp2 = temp2 < 0 ? -temp2 : temp2;

            if (temp1 + temp2 < range) {
                range = temp1 + temp2;
            }
        }
        result += range;
    }
    return result;
}

// 치킨집의 좌표 배열의 M개조합 가져와함
function solution(N, M, map) {
    const chickenCoornates = [];
    const houses = [];
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (map[row][col] === 2) {
                chickenCoornates.push([row, col]);
            }
            if (map[row][col] === 1) {
                houses.push([row, col]);
            }
        }
    }

    const remainChickenCoornates = getCombination(chickenCoornates, M);
    let minChickenRange = Infinity;
    for (const remain of remainChickenCoornates) {
        // remain =  [ [ 1, 2 ], [ 2, 2 ], [ 4, 4 ] ]
        const temp = calc(N, houses, remain);
        if (temp < minChickenRange) minChickenRange = temp;
    }
    console.log(minChickenRange);
}
