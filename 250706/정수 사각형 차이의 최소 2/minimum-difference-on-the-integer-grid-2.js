const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const grid = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    for (let lowerBound = 1; lowerBound <= 100; lowerBound++) {
        const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => new Array().fill(Infinity)));

        if (grid[0][0] < lowerBound) continue;

        dp[0][0] = grid[0][0];
    
        for (let row = 1; row < N; row++) {
            dp[row][0] = Math.max(grid[row][0], dp[row - 1][0]);
        }

        for (let col = 1; col < N; col++) {
            dp[0][col] = Math.max(grid[0][col], dp[0][col - 1]);
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

        return dp[N - 1][N - 1] - lowerBound;
    }



    
    return dp
    
    // for (let row = 1; row < N; row++) {
    //     const min = Math.min(grid[row][0], dp[row - 1][0][0]);
    //     const max = Math.max(grid[row][0], dp[row - 1][0][1]);

    //     dp[row][0] = [min, max];
    // }

    // for (let col = 1; col < N; col++) {
    //     const min = Math.min(grid[0][col], dp[0][col - 1][0]);
    //     const max = Math.max(grid[0][col], dp[0][col - 1][1]);
        
    //     dp[0][col] = [min, max];
    // }

    // for (let row = 1; row < N; row++) {
    //     for (let col = 1; col < N; col++) {
    //         const left = dp[row][col - 1];
    //         const up = dp[row - 1][col];

    //         if (Math.max(grid[row][col], up[1]) - Math.min(grid[row][col], up[0]) > Math.max(grid[row][col], left[1]) - Math.min(grid[row][col], left[0])) {
    //             const min = Math.min(grid[row][col], up[0]);
    //             const max = Math.max(grid[row][col], up[1]);

    //             dp[row][col] = [min, max];
    //         } else {
    //             const min = Math.min(grid[row][col], left[0]);
    //             const max = Math.max(grid[row][col], left[1]);

    //             dp[row][col] = [min, max];
    //         }
    //     }
    // }

    // return dp[N - 1][N - 1][1] - dp[N - 1][N - 1][0];
}

console.log(solve());