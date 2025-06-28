const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, k] = input[0].trim().split(' ').map(Number);
const grid = input.slice(1, 1 + n).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
function solve() {
    const newGrid = grid.map((row) => [...row]);
    
    const startIndex = k - 1;
    const endIndex = startIndex + m;
    
    let landingRow = n - 1;
    for (let r = 0; r < n; r++) {
        const path = newGrid[r].slice(startIndex, endIndex);
        if (path.includes(1)) {
            landingRow = r - 1;
            break;
        }
    }

    for (let c = startIndex; c < endIndex; c++) {
        newGrid[landingRow][c] = 1;
    }

    return newGrid.map((row) => row.join(" ")).join("\n");
}

console.log(solve());