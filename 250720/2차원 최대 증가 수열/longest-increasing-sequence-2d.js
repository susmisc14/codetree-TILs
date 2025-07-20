const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const grid = input.slice(1, N + 1).map(row => row.trim().split(' ').map(Number));

// Please Write your code here.
function solve() {
    const dp = Array.from({ length: N }, () => new Array(M).fill(0));
    dp[0][0] = 1;

    for (let row1 = 0; row1 < N; row1++) {
        for (let col1 = 0; col1 < M; col1++) {
            for (let row2 = 0; row2 < row1; row2++) {
                for (let col2 = 0; col2 < col1; col2++) {
                    if (grid[row2][col2] >= grid[row1][col1] || dp[row2][col2] === 0) continue;

                    dp[row1][col1] = Math.max(dp[row1][col1], dp[row2][col2] + 1);
                }
            }
        }
    }

    let result = 0;
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < M; col++) {
            result = Math.max(dp[row][col], result);
        }
    }

    return result;
}

console.log(solve());
