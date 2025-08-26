const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);

const sequence = input[1].trim().split(" ").map(Number);
sequence.unshift(0);

// Please Write your code here.
const dp = new Array(N + 1).fill(-Infinity);
dp[0] = -Infinity;

for (let i = 1; i <= N; i++) {
    dp[i] = Math.max(dp[i - 1] + sequence[i], sequence[i]);
}

const result = Math.max(...dp);
console.log(result);