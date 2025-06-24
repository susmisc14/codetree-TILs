const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map(Number);
const grid = input.slice(1, Number(n) + 1).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
let currentGrid = grid.map((row) => [...row]);

for (let i = 0; i < k; i++) {
    while (true) {
        const [newGrid, exploded] = explode(currentGrid);

        if (!exploded) break;

        currentGrid = drop(newGrid);
    }

    currentGrid = rotate(currentGrid);
    currentGrid = move(currentGrid);
    currentGrid = drop(currentGrid);
}

while (true) {
    const [newGrid, exploded] = explode(currentGrid);

    if (!exploded) break;

    currentGrid = drop(newGrid);
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
function explode(grid) {
    const newGrid = grid.map((row) => [...row]);
    let exploded = false;

    for (let c = 0; c < n; c++) {
        for (let r = 0; r < n; r++) {
            if (newGrid[r][c] === 0) continue;

            let count = 0;
            for (let i = r; i < n; i++) {
                if (newGrid[i][c] === newGrid[r][c]) {
                    count++;
                } else {
                    break;
                }
            }

            if (count >= m) {
                for (let i = r; i < r + count; i++) {
                    newGrid[i][c] = 0;
                }
                
                exploded = true;
            }
        }
    }

    return [newGrid, exploded];
}

function drop(grid) {
    const newGrid = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let c = 0; c < n; c++) {
        let keepRow = n - 1;

        for (let r = n - 1; r >= 0; r--) {
            if (grid[r][c] !== 0) {
                newGrid[keepRow][c] = grid[r][c];
                keepRow--;
            }
        }
    }

    return newGrid;
}

function rotate(grid) {
    const newGrid = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            newGrid[c][n - 1 - r] = grid[r][c];
        }
    }

    return newGrid;
}