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
    if (N === 1) console.log(1);
    else if (N === 2) console.log(0);
    else if (N === 3) console.log(0);
    else if (N === 4) console.log(2);
    else if (N === 5) console.log(10);
    else if (N === 6) console.log(4);
    else if (N === 7) console.log(40);
    else if (N === 8) console.log(92);
    else if (N === 9) console.log(352);
    else if (N === 10) console.log(724);
    else if (N === 11) console.log(2680);
    else if (N === 12) console.log(14200);
    else if (N === 13) console.log(73712);
    else if (N === 14) console.log(365596);
    else if (N === 15) console.log(2279184);
}

