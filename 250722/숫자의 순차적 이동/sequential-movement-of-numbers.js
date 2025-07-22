const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const grid = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// Please write your code here.
const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];

function solve() {
    let newGrid = grid.map((row) => [...row]);
    let coordMap = {};

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            coordMap[grid[row][col]] = [row, col];
        }
    }

    for (let turn = 0; turn < M; turn++) {
        for (let key = 1; key <= N * N; key++) {
            const [row, col] = coordMap[key];
            let selected = [];
            
            for (let i = 0; i < 8; i++) {
                const nextRow = row + dr[i];
                const nextCol = col + dc[i];

                if (inRange(nextRow, nextCol) && newGrid[nextRow][nextCol] > (selected[2] || 0)) {
                    selected = [nextRow, nextCol, newGrid[nextRow][nextCol]];
                };
            }

            newGrid[selected[0]][selected[1]] = newGrid[row][col];
            newGrid[row][col] = selected[2];

            coordMap[selected[2]] = [row, col];
            coordMap[key] = [selected[0], selected[1]];
        }
    }

    return newGrid
            .map((row) => row.join(" "))
            .join("\n");
}

console.log(solve());

// Helpers

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}