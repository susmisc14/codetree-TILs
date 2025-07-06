const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const grid = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
const dp = Array.from({ length: N }, () => new Array(N).fill(0));

function solve() {
    let maxCount = 0;

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            maxCount = Math.max(countMoveableCell(row, col), maxCount);
        }
    }

    return maxCount;
}

console.log(solve());

// helpers
function countMoveableCell(currentRow, currentCol) {
    if (dp[currentRow][currentCol] !== 0) {
        return dp[currentRow][currentCol];
    }

    // 시계 방향
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    let count = 1;

    for (let i = 0; i < 4; i++) {
        const nextRow = currentRow + dr[i];
        const nextCol = currentCol + dc[i];

        if (!inRange(nextRow, nextCol) || grid[nextRow][nextCol] <= grid[currentRow][currentCol]) continue;

        count = Math.max(countMoveableCell(nextRow, nextCol) + 1, count);
    }

    dp[currentRow][currentCol] = count;

    return count;
}

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}