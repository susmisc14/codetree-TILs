const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const grid = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const visited = new Array(N).fill(false);
    
    const result = (function recursive(row, coords) {
        if (row === N) {
            return coords.reduce((acc, [row, col]) => acc + grid[row][col], 0);
        }

        let maxNumber = -Infinity;

        for (let col = 0; col < N; col++) {
            if (!visited[col]) {
                visited[col] = true;
                maxNumber = Math.max(recursive(row + 1, [...coords, [row, col]]), maxNumber);
                visited[col] = false;
            }
        }

        return maxNumber;
    })(0, []);

    return result;
}

console.log(solve());