const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const profit = input[1].split(" ").map(Number);

// Please Write your code here.
const dp = new Array(N + 1).fill(-Infinity);
dp[0] = 0;

for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= i; j++) {
        dp[i] = Math.max(profit[j - 1] + dp[i - j], dp[i]);
    }
}

const result = dp[N];
console.log(result);