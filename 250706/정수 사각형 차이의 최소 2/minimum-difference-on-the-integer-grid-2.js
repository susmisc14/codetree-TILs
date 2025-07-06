const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const grid = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    let result = Infinity;

    for (let lowerBound = 1; lowerBound <= 100; lowerBound++) {
        const dp = Array.from({ length: N }, () => new Array(N).fill(Infinity));

        if (grid[0][0] < lowerBound) continue;

        dp[0][0] = grid[0][0];
    
        for (let row = 1; row < N; row++) {
            if (grid[row][0] >= lowerBound) {
                dp[row][0] = Math.max(grid[row][0], dp[row - 1][0]);
            }
        }

        for (let col = 1; col < N; col++) {
            if (grid[0][col] >= lowerBound) {
                dp[0][col] = Math.max(grid[0][col], dp[0][col - 1]);
            }
        }
    
        for (let row = 1; row < N; row++) {
            for (let col = 1; col < N; col++) {
                if (grid[row][col] >= lowerBound) {
                    const prev = Math.min(dp[row - 1][col], dp[row][col - 1]);
                    if (prev !== Infinity) {
                        dp[row][col] = Math.max(prev, grid[row][col]);
                    }
                }
            }
        }

        if (dp[N - 1][N - 1] !== Infinity) {
            const diff = dp[N - 1][N - 1] - lowerBound;
            result = Math.min(diff, result);
        }
    }

    return result;
}

console.log(solve());