const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const grid = input.slice(0, 4).map(line => line.trim().split(' ').map(Number));
const dir = input[4];

// Please Write your code here.
function rotate90(grid) {
    const n = grid.length;

    const newGrid = Array.from({ length: n }, () => Array.from({ length: n }).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            newGrid[j][n - 1 - i] = grid[i][j];
        }
    }

    return newGrid;
}

function processRow(row) {
    const filtered = [];
    for (let i = 0; i < row.length; i++) {
        if (row[i] === 0) continue;

        filtered.push(row[i]);
    }

    const merged = [];
    for (let i = 0; i < filtered.length; i++) {
        if (filtered[i] === filtered[i + 1]) {
            merged.push(filtered[i] * 2);
            i++;
        } else {
            merged.push(filtered[i]);
        }
    }

    const padded = Array.from({ length: row.length }).fill(0);
    for (let i = 0; i < merged.length; i++) {
        padded[i] = merged[i];
    }

    return padded;
}

let cloned = grid.map((row) => [...row]);

if (dir === "U") {
    cloned = rotate90(cloned);
    cloned = rotate90(cloned);
    cloned = rotate90(cloned);

    for (let i = 0; i < cloned.length; i++) {
        cloned[i] = processRow(cloned[i]);
    }

    cloned = rotate90(cloned);
}

if (dir === "R") {
    cloned = rotate90(cloned);
    cloned = rotate90(cloned);

    for (let i = 0; i < cloned.length; i++) {
        cloned[i] = processRow(cloned[i]);
    }

    cloned = rotate90(cloned);
    cloned = rotate90(cloned);
}

if (dir === "D") {
    cloned = rotate90(cloned);

    for (let i = 0; i < cloned.length; i++) {
        cloned[i] = processRow(cloned[i]);
    }

    cloned = rotate90(cloned);
    cloned = rotate90(cloned);
    cloned = rotate90(cloned);
}

if (dir === "L") {
    for (let i = 0; i < cloned.length; i++) {
        cloned[i] = processRow(cloned[i]);
    }
}


for (const row of cloned) {
    console.log(row.join(" "));
}