const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M, r, c] = input[0].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const grid = Array.from({ length: N }, () => Array(N).fill(0));

    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    // 1-based to 0-based
    const startRow = r - 1;
    const startCol = c - 1;

    grid[startRow][startCol] = 1;

    for (let time = 1; time <= M; time++) {
        const coords = [];

        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                if (grid[row][col] === 1) {
                    coords.push([row, col]);
                }
            }
        }

        const distance = Math.pow(2, time - 1);

        for (const [row, col] of coords) {
            for (let i = 0; i < 4; i++) {
                const nextRow = row + dr[i] * distance;
                const nextCol = col + dc[i] * distance;

                if (!inRange(nextRow, nextCol)) continue;

                grid[nextRow][nextCol] = 1;
            }
        }
    }

    let total = 0;
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (grid[row][col] === 0) continue;
            
            total += 1;
        }
    }

    return total;
}


console.log(solve());

// helpers
function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}