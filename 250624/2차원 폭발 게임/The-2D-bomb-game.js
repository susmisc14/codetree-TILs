const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map(Number);
const grid = input.slice(1, Number(n) + 1).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
let currentGrid = grid.map((row) => [...row]);

let i = 0;
while (i <= k) {
    currentGrid = rotate(currentGrid);
    currentGrid = move(currentGrid);
    currentGrid = drop(currentGrid);
    i++;
}

let result = 0;
for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
        if (currentGrid[r][c] === 0) continue;

        result++;
    }
}

console.log(result);

// helpers
function rotate (grid) {
    const newGrid = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            newGrid[c][n - r - 1] = grid[r][c];
        }
    }

    return newGrid;
}

function move(grid) {
    const newGrid = [];

    for (let r = 0; r < n; r++) {
        const filteredRow = grid[r].filter((current) => current !== 0);
        const newRow = [];
        let count = 1;

        for (let i = 1; i <= filteredRow.length; i++) {
            if (i < filteredRow.length && filteredRow[i] === filteredRow[i - 1]) {
                count++;
            } else {
                if (count < m) {
                    newRow.push(...Array(count).fill(filteredRow[i - 1]));
                }

                count = 1;
            }
        }

        while (newRow.length < n) {
            newRow.push(0);
        }

        newGrid.push(newRow);
    }

    return newGrid;
}

function drop(grid) {
    const clonedGrid = grid.map((row) => [...row]);

    for (let c = 0; c < n; c++) {
        let keepRow = null;

        for (let r = n - 1; r >= 0; r--) {
            if (clonedGrid[r][c] === 0) {
                keepRow = Math.max(r, keepRow);
                continue;
            }
            
            if (keepRow !== null) {
                clonedGrid[keepRow][c] = clonedGrid[r][c];
                clonedGrid[r][c] = 0;
                keepRow = r;
            }
        }
    }

    return clonedGrid;
}