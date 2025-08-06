const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const jewels = input.slice(1).map(line => line.split(" ").map(Number));

// Please Write your code here.
function solve() {
    const dp = new Array(M + 1).fill(-Infinity);
    dp[0] = 0;

    for (let i = 0; i < N; i++) {
        for (let j = 1; j <= M; j++) {
            const [weight, value] = jewels[i];
            if (weight <= j && dp[j - weight] !== -Infinity) {
                dp[j] = Math.max(dp[j - weight] + value, dp[j]);
            }
        }
    }

    return Math.max(...dp);
}

console.log(solve());