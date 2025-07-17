const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const grid = input.slice(1, N + 1);

// Please Write your code here.
function solve() {
    const coins = [];
    let startRow = 0;
    let startCol = 0;
    let endRow = 0;
    let endCol = 0;
    
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const value = grid[row][col];

            if (value === "S") {
                startRow = row;
                startCol = col;
                continue;
            }

            if (value === "E") {
                endRow = row;
                endCol = col;
                continue;
            }

            if (!Number.isNaN(Number(value))) {
                coins.push([row, col]);
                continue;
            }
        }
    }

    coins.sort((a, b) => grid[a[0]][a[1]] - grid[b[0]][b[1]]);

    const result = (function recursive(lastCoinIndex, collected) {
        let minCount = Infinity;

        if (collected.length >= 3) {
            let currentDistance = getManhattanDistance([startRow, startCol], collected[0]);            
            for (let i = 0; i < collected.length - 1; i++) {
                currentDistance += getManhattanDistance(collected[i], collected[i + 1]);
            }

            currentDistance += getManhattanDistance(collected[collected.length - 1], [endRow, endCol]);
            minCount = currentDistance;
        }


        for (let i = lastCoinIndex; i < coins.length; i++) {            
            minCount = Math.min(recursive(i + 1, [...collected, coins[i]]), minCount);
        }

        return minCount;
    })(0, []);

    return result === Infinity ? -1 : result;
}

console.log(solve());

// helpers
function getManhattanDistance(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1])
}