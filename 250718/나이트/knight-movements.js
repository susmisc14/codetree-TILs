const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const [r1, c1, r2, c2] = input[1].split(' ').map(v => Number(v));

// Please Write your code here.
function solve() {
    const queue = [];

    const startRow = r1 - 1;
    const startCol = c1 - 1;
    const endRow = r2 - 1;
    const endCol = c2 - 1;
    
    const dr = [-2, -1, 1, 2, 2, 1, -1, -2];
    const dc = [1, 2, 2, 1, -1, -2, -2, -1];

    queue.push([startRow, startCol, 0]);

    while (queue.length > 0) {
        const [currentRow, currentCol, distance] = queue.shift();

        if (currentRow === endRow && currentCol === endCol) {
            return distance; 
        };


        for (let i = 0; i < 8; i++) {
            const nextRow = currentRow + dr[i];
            const nextCol = currentCol + dc[i];

            if (!inRange(nextRow, nextCol)) continue;

            queue.push([nextRow, nextCol, distance + 1]);
        }
    }

    return -1;
}

console.log(solve());

// helpers
function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}