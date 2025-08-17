const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const coins = input[1].split(" ").map(Number);

// Please Write your code here.
const dp = new Array(M + 1).fill(Infinity);
dp[0] = 0;

for (const coin of coins) {
    for (let i = M; i >= 0; i--) {
        if (i >= coin && dp[i - coin] !== Infinity) {
            dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
        }
    }
}

const result = dp[M];
console.log(result !== Infinity ? result : -1);