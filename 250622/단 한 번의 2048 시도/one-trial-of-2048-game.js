const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const grid = input.slice(0, 4).map(line => line.split(' ').map(Number));
const dir = input[4];

// Please Write your code here.
const GRID_SIZE = 4;

let currentGrid = grid.map((row) => [...row]);

switch (dir) {
    case 'U': {
        currentGrid = rotate(currentGrid);
        currentGrid = rotate(currentGrid);
        currentGrid = rotate(currentGrid);

        currentGrid = move(currentGrid);

        currentGrid = rotate(currentGrid);

        break;
    }

    case 'R': {
        currentGrid = rotate(currentGrid);
        currentGrid = rotate(currentGrid);

        currentGrid = move(currentGrid);

        currentGrid = rotate(currentGrid);
        currentGrid = rotate(currentGrid);

        break;
    }

    case 'D': {
        currentGrid = rotate(currentGrid);

        currentGrid = move(currentGrid);

        currentGrid = rotate(currentGrid);

        break;
    }

    case 'L': {
        currentGrid = move(currentGrid);

        break;
    }
}

currentGrid.forEach((row) => console.log(row.join(" ")));


// helpers
function rotate (grid) {
    const newGrid = Array.from({ length: GRID_SIZE }, () => new Array(GRID_SIZE).fill(0));
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            newGrid[c][GRID_SIZE - r - 1] = grid[r][c];
        }
    }
    
    return newGrid;
}

function move (grid) {
    const newGrid = [];
    for (let r = 0; r < GRID_SIZE; r++) {
        const tempRow = grid[r].filter((current) => current !== 0);
        const newRow = [];

        let i = 0;
        while (i < tempRow.length) {
            if (i + 1 < tempRow.length && tempRow[i] === tempRow[i + 1]) {
                newRow.push(tempRow[i] * 2);
                i += 2;
            } else {
                newRow.push(tempRow[i]);
                i += 1;
            }
        }

        while (newRow.length < GRID_SIZE) {
            newRow.push(0);
        }

        newGrid.push(newRow);
    }

    return newGrid;
}