const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const jobs = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
jobs.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

function solve() {
    const dp = new Array(N).fill(0);
    dp[0] = jobs[0][2];

    for (let i = 1; i < N; i++) {
        dp[i] = jobs[i][2];

        for (let j = 0; j < i; j++) {
            if (isOverlap(jobs[j], jobs[i])) continue;

            dp[i] = Math.max(dp[j] + jobs[i][2], dp[i]);
        }
    }

    return Math.max(...dp);
}

console.log(solve());

// Helpers

function isOverlap(a, b) {
    return a[0] >= b[0] && a[0] <= b[1] || b[0] >= a[0] && b[0] <= a[1];
}