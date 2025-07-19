const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const sequence = input[1].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const dp = new Array(N).fill(1);

    for (let i = 1; i < N; i++) {
        for (let j = 0; j < i; j++) {
            if (sequence[j] >= sequence[i]) continue;

            dp[i] = Math.max(dp[j] + 1, dp[i]);
        }
    }

    return Math.max(...dp);
}

console.log(solve());