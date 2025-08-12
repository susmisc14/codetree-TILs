const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const quests = input.slice(1).map(line => line.split(" ").map(Number));

// Please Write your code here.
const DP_SIZE = 2 * M + 1;

const dp = new Array(DP_SIZE).fill(Infinity);
dp[0] = 0;

for (let i = 0; i < N; i ++) {
    const [e, t] = quests[i];

    for (let j = DP_SIZE; j >= 0; j--) {
        if (j >= e && dp[j - e] !== Infinity) {
            dp[j] = Math.min(dp[j - e] + t, dp[j]);
        }
    }
}

const result = Math.min(...dp.slice(M));
console.log(result);