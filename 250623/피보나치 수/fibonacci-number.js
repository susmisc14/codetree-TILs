const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);

// Please Write your code here.
const dp = [1, 1];

for (let i = 1; i < n; i ++) {
    dp.push(dp[i] + dp[i - 1]);
}

console.log(dp[n - 1]);