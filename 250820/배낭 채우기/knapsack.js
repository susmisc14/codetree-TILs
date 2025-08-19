const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const jewels = input.slice(1).map(line => line.split(" ").map(Number));

// Please Write your code here.
const dp = new Array(M + 1).fill(-Infinity);
dp[0] = 0;

for (let [weight, value] of jewels) {
    for (let i = M; i >= 0; i--) {
        if (i >= weight && dp[i - weight] !== -Infinity) {
            dp[i] = Math.max(dp[i - weight] + value, dp[i]);
        }
    }
}

const result = Math.max(...dp);
console.log(result);