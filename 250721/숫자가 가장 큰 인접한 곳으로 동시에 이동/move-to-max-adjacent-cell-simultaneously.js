const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M, T] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(' ').map(Number));
const marbles = input.slice(1 + N, 1 + N + M).map(line => line.split(' ').map(Number));

// Please Write your code here.
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function solve() {
    let newMarbles = marbles.map(([row, col]) => [row - 1, col - 1]);

    for (let time = 0; time < T; time++) {
        if (marbles.length === 0) break;

        const nextPositions = [];
        for (const [row, col] of newMarbles) {
            nextPositions.push(findNextPosition(row, col));
        }

        const nextCount = Array.from({ length: N }, () => new Array(N).fill(0));
        for (const [row, col] of nextPositions) {
            nextCount[row][col] += 1;
        }

        const remainingMarbles = [];
        for (let i = 0; i < nextPositions.length; i++) {
            const [row, col] = nextPositions[i];

            if (nextCount[row][col] === 1) {
                remainingMarbles.push([row, col]);
            }
        }

        newMarbles = remainingMarbles;
    }

    return newMarbles.length;
}

console.log(solve());

// Helpers

function findNextPosition(row, col) {
    let maxValue = 1;
    let nextPosition = [-1, -1];

    for (let i = 0; i < 4; i++) {
        const nextRow = row + dr[i];
        const nextCol = col + dc[i];

        if (!inRange(nextRow, nextCol) || grid[nextRow][nextCol] <= maxValue) continue;

        maxValue = grid[nextRow][nextCol];
        nextPosition = [nextRow, nextCol];
    }

    return nextPosition;
}

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}