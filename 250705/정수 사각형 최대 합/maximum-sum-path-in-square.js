const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const grid = input.slice(1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const dp = Array.from({ length: N }, () => new Array(N).fill(0));

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const prevRow = Math.max(row - 1, 0);
            const prevCol = Math.max(col - 1, 0);

            dp[row][col] = Math.max(dp[prevRow][col] + grid[row][col], dp[row][prevCol] + grid[row][col]);
        }
    }

    return dp[N - 1][N - 1];
}

console.log(solve());