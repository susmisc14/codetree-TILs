const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, k] = input[0].trim().split(' ').map(Number);
const grid = input.slice(1, 1 + n).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
function solve() {
    const newGrid = grid.map((row) => [...row]);
    let baseY = null;

    for (let r = 0; r < n; r++) {
        for (let c = k - 1; c < k - 1 + m; c++) {
            if (newGrid[r][c] === 0) continue;

            baseY = r - 1;
        }

        if (baseY !== null) break;
    }

    for (let c = k - 1; c < k - 1 + m; c++) {
        newGrid[baseY ?? n - 1][c] = 1;
    }

    return newGrid.map((row) => row.join(" ")).join("\n");
}

console.log(solve());