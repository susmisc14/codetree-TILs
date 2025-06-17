const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));
const [r, c] = input[1 + n].split(' ').map(Number);

// Please Write your code here.
const temp = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
const groundZero = [r - 1, c - 1];
const value = grid[groundZero[0]][groundZero[1]];

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (j === groundZero[1] && i > groundZero[0] - value && i < groundZero[0] + value) {
            grid[i][j] = 0;
        }

        if (i === groundZero[0] && j > groundZero[1] - value && j < groundZero[1] + value) {
            grid[i][j] = 0;
        }
    }
}

for (let i = 0; i < n; i++) {
    let tempRow = n - 1;
    for (let j = n - 1; j >= 0; j--) {
        if (grid[j][i] !== 0) {
            temp[tempRow][i] = grid[j][i];
            tempRow--;
        }
    }
}

for (let i = 0; i < n; i++) {
    console.log(temp[i].join(" "));
}