const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let arr = [];

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else {
        arr.push(line.split(" ").map(Number));
        if (arr.length === N) {
            solution(N, arr);
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

function getPermutaion(arr) {
    const result = [];
    const visited = [];
    for (let i = 0; i < arr.length; i++) {
        visited.push(false);
    }

    function permutate(current, visited) {
        if (current.length === 2) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            if (visited[i]) continue;
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

// 1. N/2 만큼 사람을 나눌수 있는 경우의 수 체크
// 2. 그 경우의 수에서 팀 간 능력치 차이 체크
// 3. 이전에 구한값 vs 새로구한값으로 최소 찾기
// 4. 순열 이용해서 각 능력치 합 구하기
function solution(N, arr) {
    const people = [];
    for (let i = 0; i < N; i++) {
        people.push(i);
    }

    const comb = getCombination(people, N / 2);
    let answer = Infinity;
    for (const team of comb) {
        let team1Score = 0;
        let team2Score = 0;

        const team1 = new Set(team);
        const team2 = new Set();
        for (let i = 0; i < N; i++) {
            if (!team1.has(i)) {
                team2.add(i);
            }
        }

        const temp1 = getPermutaion([...team1.values()]);
        const temp2 = getPermutaion([...team2.values()]);
        for (const [a, b] of temp1) {
            team1Score += arr[a][b];
        }
        for (const [a, b] of temp2) {
            team2Score += arr[a][b];
        }
        const result = Math.abs(team1Score - team2Score);
        answer = Math.min(answer, result);
    }
    console.log(answer);
}
