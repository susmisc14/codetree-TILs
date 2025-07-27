const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const grid = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const visited = {
        row: new Array(N).fill(false),
        col: new Array(N).fill(false)
    };
    
    const result = (function recursive(coords) {
        if (coords.length === N) {
            return coords.reduce((acc, [row, col]) => acc + grid[row][col], 0);
        }

        let maxNumber = -Infinity;

        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                if (visited.row[row] || visited.col[col]) continue;

                visited.row[row] = true;
                visited.col[col] = true;
                maxNumber = Math.max(recursive([...coords, [row, col]]), maxNumber);
                visited.row[row] = false;
                visited.col[col] = false;
            }
        }

        return maxNumber;
    })([]);

    return result;
}

console.log(solve());