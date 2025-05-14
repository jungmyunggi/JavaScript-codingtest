const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let arr;

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else {
        arr = line.split(" ").map(Number);
        solution(N, arr);
        rl.close();
    }
});

function getPermutaion(arr, N) {
    const result = [];
    const visited = Array(arr.length).fill(false);

    function permutate(current, visited) {
        if (current.length === N) {
            result.push([...current]);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (visited[i] === true) continue;
            current.push(arr[i]);
            visited[i] = true;
            permutate(current, visited);
            visited[i] = false;
            current.pop();
        }
    }

    permutate([], visited);
    return result;
}

function solution(N, arr) {
    if (N < 3) {
        for (let i = N; i < 3; i++) {
            arr.push(0);
        }
    }

    const attack = getPermutaion([9, 3, 1], 3);
    const temp = []; // 방문 카운트 저장
    for (let i = 0; i < 61; i++) {
        temp[i] = [];
        for (let j = 0; j < 61; j++) {
            temp[i][j] = [];
            for (let k = 0; k < 61; k++) {
                temp[i][j][k] = Infinity;
            }
        }
    }

    let answer = Infinity;

    function helper(s1, s2, s3, count) {
        if (s1 <= 0 && s2 <= 0 && s3 <= 0) {
            answer = Math.min(answer, count);
            return;
        }
        if (temp[s1][s2][s3] <= count) return Infinity;
        temp[s1][s2][s3] = count;

        for (const [d1, d2, d3] of attack) {
            const newS1 = Math.max(0, s1 - d1);
            const newS2 = Math.max(0, s2 - d2);
            const newS3 = Math.max(0, s3 - d3);

            helper(newS1, newS2, newS3, count + 1);
        }
    }

    helper(arr[0], arr[1], arr[2], 0);

    console.log(answer);
}
