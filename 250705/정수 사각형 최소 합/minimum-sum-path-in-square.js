const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const grid = input.slice(1, 1 + N).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const dp = Array.from({ length: N }, () => new Array(N).fill(0));
    dp[0][N - 1] = grid[0][N - 1];

    for (let row = 1; row < N; row++) {
        dp[row][N - 1] = dp[row - 1][N - 1] + grid[row][N - 1];
    }

    for (let col = N - 2; col >= 0; col--) {
        dp[0][col] = dp[0][col + 1] + grid[0][col];
    }

    for (let row = 1; row < N; row++) {
        for (let col = N - 2; col >= 0; col--) {
            dp[row][col] = Math.min(dp[row - 1][col], dp[row][col + 1]) + grid[row][col];
        }
    }

    return dp[N - 1][0];
}

console.log(solve());