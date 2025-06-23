const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);

// Please Write your code here.
const MOD = 1000000007;

/**
 * 아이디어
 *  점화식: ??
 */

const dp = [1, 2];

for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] * 2 + dp[i - 2] * 3) % MOD;
    for (let j = i - 3; j >= 0; j--) {
        dp[i] = (dp[i] + dp[j] * 2) % MOD;
    }
}

console.log(dp[n]);