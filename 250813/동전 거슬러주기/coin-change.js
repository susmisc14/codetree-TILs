const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const coins = input[1].split(" ").map(Number);

// Please Write your code here.
const dp = new Array(M + 1).fill(Infinity);
dp[0] = 0;

for (let i = 1; i <= M; i++) {
    for (let j = 0; j < N; j++) {
        const currentCoin = coins[j];
        if (i >= currentCoin) {
            dp[i] = Math.min(dp[i], dp[i - currentCoin] + 1);
        }
    }
}

const result = dp[M];
console.log(result === Infinity ? -1 : result);