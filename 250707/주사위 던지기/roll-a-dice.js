const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M, r, c] = input[0].split(' ').map(Number);
const directions = input[1].split(' ');

function solve() {
    const grid = Array.from({ length: N }, () => new Array(N).fill(0));

    let top = 1
    let bottom = 6
    let front = 2
    let back = 5
    let left = 4
    let right = 3;
    
    // 1-based to 0-based
    let currentRow = r - 1;
    let currentCol = c - 1;
    
    grid[currentRow][currentCol] = 7 - top;

    const dc = { U: -1, D: 1, L: 0, R: 0 };
    const dr = { U: 0, D: 0, L: -1, R: 1 };

    for (const direction of directions) {
        const nextRow = currentRow + dc[direction];
        const nextCol = currentCol + dr[direction];
        
        if (nextRow < 0 || nextRow >= N || nextCol < 0 || nextCol >= N) continue;

        if (direction === "R") {
            [top, left, bottom, right] = [left, bottom, right, top];
        } else if (direction === "L") {
            [top, right, bottom, left] = [right, bottom, left, top];
        } else if (direction === "D") {
            [top, back, bottom, front] = [back, bottom, front, top];
        } else if (direction === "U") {
            [top, front, bottom, back] = [front, bottom, back, top];
        }

        currentRow = nextRow;
        currentCol = nextCol;
        grid[currentRow][currentCol] = 7 - top;
    }

    let total = 0;
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            total += grid[row][col];
        }
    }
    
    return total;
}

console.log(solve());