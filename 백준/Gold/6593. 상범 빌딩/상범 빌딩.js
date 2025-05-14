const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
    if (line === "0 0 0") {
        input.push(line);
        rl.close();
    } else {
        input.push(line);
    }
});

rl.on("close", () => {
    solution(input);
});

function solution(input) {
    let index = 0;
    while (index < input.length) {
        const [L, R, C] = input[index++].split(" ").map(Number);
        if (L === 0 && R === 0 && C === 0) break;

        const building = [];
        for (let l = 0; l < L; l++) {
            const floor = [];
            for (let r = 0; r < R; r++) {
                floor.push(input[index++].split(""));
            }
            building.push(floor);
            index++;
        }

        bfs(building, L, R, C);
    }
}

const d = [
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
];

function bfs(building, L, R, C) {
    const dest = [];
    const queue = [];
    let queueIndex = 0;
    for (let l = 0; l < L; l++) {
        for (let row = 0; row < R; row++) {
            for (let col = 0; col < C; col++) {
                if (building[l][row][col] === "S") {
                    queue.push([l, row, col, 0]);
                }
                if (building[l][row][col] === "E") {
                    dest.push(l);
                    dest.push(row);
                    dest.push(col);
                }
            }
        }
    }

    let flag = false;
    while (queue.length !== queueIndex) {
        const [cl, cr, cc, cost] = queue[queueIndex++];
        if (cl === dest[0] && cr === dest[1] && cc === dest[2]) {
            console.log(`Escaped in ${cost} minute(s).`);
            flag = true;
        }
        for (const [dl, dr, dc] of d) {
            const newL = dl + cl;
            const newRow = dr + cr;
            const newCol = dc + cc;

            if (newL < 0 || newL >= L) continue;
            if (newRow < 0 || newRow >= R) continue;
            if (newCol < 0 || newCol >= C) continue;
            if (building[newL][newRow][newCol] === "#") continue;
            if (building[newL][newRow][newCol] === "1") continue;

            queue.push([newL, newRow, newCol, cost + 1]);
            building[newL][newRow][newCol] = "1";
        }
    }
    if (!flag) console.log("Trapped!");
}
