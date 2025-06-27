const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const n = Number(input[0]);

// Please Write your code here.
const MOD = 10007

function solve() {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2] * 2) % MOD;
    }

    return dp[n];
}

console.log(solve());