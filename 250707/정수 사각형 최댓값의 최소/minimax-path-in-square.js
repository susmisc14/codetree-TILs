const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const grid = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const dp = Array.from({ length: N }, () => new Array(N).fill(0));
    dp[0][0] = grid[0][0];

    for (let row = 1; row < N; row++) {
        dp[row][0] = Math.max(dp[row - 1][0], grid[row][0]);
    }

    for (let col = 1; col < N; col++) {
        dp[0][col] = Math.max(dp[0][col - 1], grid[0][col]);
    }

    for (let row = 1; row < N; row++) {
        for (let col = 1; col < N; col++) {
            dp[row][col] = Math.max(Math.min(dp[row - 1][col], dp[row][col - 1]), grid[row][col]);
        }
    }

    return dp[N - 1][N - 1];
}

console.log(solve());