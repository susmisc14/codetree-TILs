const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M, T] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(' ').map(Number));
const marbles = input.slice(1 + N, 1 + N + M).map(line => line.split(' ').map(Number));

// Please Write your code here.
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function solve() {
    const count = Array.from({ length: N }, () => new Array(N).fill(0));
    let newMarbles = marbles.map(([row, col]) => [row - 1, col - 1]);

    let time = 0;

    while (time < T) {
        for (let i = 0; i < M; i++) {
            if (newMarbles.length === 0) break;

            const [currentRow, currentCol] = newMarbles[i]
            const candidate = [];

            for (let j = 0; j < 4; j++) {
                const nextRow = currentRow + dr[j];
                const nextCol = currentCol + dc[j];

                if (!inRange(nextRow, nextCol)) continue;

                candidate.push([nextRow, nextCol, grid[nextRow][nextCol]])
            }

            candidate.sort((a, b) => {
                if (a[2] !== b[2]) {
                    return b[2] - a[2];
                }

                if (a[0] !== b[0]) {
                    return b[0] - a[0];
                }

                return b[1] - a[1];
            });

            if (count[candidate[0][0]][candidate[0][1]] === 1) {
                count[candidate[0][0]][candidate[0][1]] = 0;
                newMarbles = newMarbles.filter(([row, col]) => row !== candidate[0][0] && col !== candidate[0][1]);

                continue;
            }

            count[candidate[0][0]][candidate[0][1]] = 1;
        }

        time += 1;
    }

    let result = 0;
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (count[row][col] !== 1) continue;
            result += 1;
        }
    }

    return result;
}

console.log(solve());

// Helpers

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}