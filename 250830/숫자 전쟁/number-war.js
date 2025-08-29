const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const a = input[1].split(" ").map(Number);
const b = input[2].split(" ").map(Number);

// Please write your code here.
const dp = Array.from({ length: N + 5 }, () => new Array(N + 5).fill(-1));
dp[0][0] = 0;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (dp[i][j] === -1) continue;

        if (a[i] < b[j]) {
            dp[i + 1][j] = Math.max(dp[i][j], dp[i + 1][j]);
        }

        if (a[i] > b[j]) {
            dp[i][j + 1] = Math.max(dp[i][j] + b[j], dp[i][j + 1]);
        }

        dp[i + 1][j + 1] = Math.max(dp[i][j], dp[i + 1][j + 1]);
    }
}

const result = Math.max(...dp.flat(Infinity));
console.log(result);