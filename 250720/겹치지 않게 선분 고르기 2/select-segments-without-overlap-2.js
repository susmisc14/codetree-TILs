const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const segments = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const dp = new Array(N).fill(1);

    for (let i = 1; i < N; i++) {
        for (let j = 0; j < i; j++) {
            if (isOverlap(segments[j], segments[i])) continue;

            dp[i] = Math.max(dp[j] + 1, dp[i]);
        }
    }

    return Math.max(...dp);
}

console.log(solve());

// helpers
function isOverlap(a, b) {
    return a[0] >= b[0] && a[0] <= b[1] || a[1] >= b[0] && a[1] <= b[1];
}