const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);

// Please Write your code here.

/**
 * 1. 아이디어
 *  점화식: dp[i] = dp[i - 2] + dp[i - 3]
 */

const dp = [1, 0, 1];

for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 2] + dp[i - 3]) % 10007;
}

console.log(dp[n]);