const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const grid = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

function solve() {
    let currentGrid = grid.map((row) => [...row]);
    let result = 0;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < N; j++) {
            result = Math.max(simulate(0, j, 1, currentGrid), result);
        }

        if (i < 3) {
            currentGrid = rotate(currentGrid);
        }
    }

    return result;
}

console.log(solve());

// Helpers
function simulate(row, col, dirction, grid) {
    let currentRow = row;
    let currentCol = col;
    let currentDirection = dirction;
    let time = 1;

    while (inRange(currentRow, currentCol)) {
        const blockType = grid[currentRow][currentCol];

        if (blockType > 0) {
            currentDirection = changeDirection(blockType, currentDirection);
        }

        currentRow += dr[currentDirection];
        currentCol += dc[currentDirection];
        time += 1;
    }

    return time;
}

function rotate(grid) {
    const newGrid = Array.from({ length: N }, () => new Array(N).fill(0));
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const value = grid[row][col];
            if (value === 1) {
                newGrid[col][N - 1 - row] = 2;
            } else if (value === 2) {
                newGrid[col][N - 1 - row] = 1;
            } else {
                newGrid[col][N - 1 - row] = 0;
            }
        }
    }
    return newGrid;
}

function changeDirection(blockType, direction) {
    const directionMap = [
        [],
        [3, 2, 1, 0],
        [1, 0, 3, 2],
    ];

    return directionMap[blockType][direction];
}

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}