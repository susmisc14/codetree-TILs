const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M, r, c] = input[0].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const grid = Array.from({ length: N }, () => Array(N).fill(0));
    let coords = [];

    // 시계 방향
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    // 1-based to 0-based
    const startRow = r - 1;
    const startCol = c - 1;

    grid[startRow][startCol] = 1;
    
    let time = 1;

    while (time <= M) {
        for (let i = 0; i < 4; i++) {
            const nextRow = startRow + dr[i] * time;
            const nextCol = startCol + dc[i] * time;

            if (!inRange(nextRow, nextCol)) continue;

            if (time % 2 === 0) {
                coords.push([nextRow, nextCol]);
            }

            grid[nextRow][nextCol] = 1;
        }

        while (coords.length !== 0) {
            const [row, col] = coords.pop();

            for (let i = 0; i < 4; i++) {
                const nextRow = row + dr[i];
                const nextCol = col + dc[i];

                if (!inRange(nextRow, nextCol)) continue;

                grid[nextRow][nextCol] = 1;
            }
        }
        
        time += 1;
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