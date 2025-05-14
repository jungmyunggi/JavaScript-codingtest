const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let N, M;
let numArr;
let queries = [];

rl.on("line", (line) => {
  if (!N && !M) {
    [N, M] = line.split(" ").map(Number);
  } else if (!numArr) {
    numArr = line.split(" ").map(Number);
  } else {
    queries.push(line.split(" ").map(Number));
    if (queries.length === M) {
      solution(N, numArr, queries);
      rl.close();
    }
  }
});

function solution(N, numArr, queries) {
  const temp = [];
  const output = [];
  for (let i = 0; i <= N; i++) {
    temp.push(0);
  }
  for (let i = 1; i <= N; i++) {
    temp[i] = temp[i - 1] + numArr[i - 1];
  }

  for (const [left, right] of queries) {
    output.push(temp[right] - temp[left - 1]);
  }
  console.log(output.join("\n"));
}
