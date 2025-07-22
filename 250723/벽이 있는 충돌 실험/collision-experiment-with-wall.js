const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const queue = [];
const T = Number(input[0]);

let head = 1;
for (let i = 0; i < T; i++) {
    const [N, M] = input[head++].split(" ").map(Number);
    const marbles = [];
    for (let j = 0; j < M; j++) {
        let [x, y, d] = input[head++].split(" ");
        marbles.push([Number(x) - 1, Number(y) - 1, d]);
    }
    queue.push([ N, M, marbles ]);
}

// Please Write your code here.
const directionMap = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1]
}

function solve() {
    const result = [];

    for (const [N, M, marbles] of queue) {
        let currentMarbles = marbles;
        
        const inRange = (row, col) => row >= 0 && row < N && col >= 0 && col < N;

        for (let time = 0; time < N * 2; time++) {
            if (currentMarbles.length === 0) break;

            const nextMarbles = [];
            for (const [row, col, direction] of currentMarbles) {
                const nextRow = row + directionMap[direction][0];
                const nextCol = col + directionMap[direction][1];

                if (inRange(nextRow, nextCol)) {
                    nextMarbles.push([nextRow, nextCol, direction]);
                } else {
                    nextMarbles.push([row, col, invertDirection(direction)]);
                }
            }

            const countGrid = new Map();
            for (const [row, col] of nextMarbles) {
                const key = `${row}-${col}`;
                countGrid.set(key, (countGrid.get(key) || 0) + 1);
            }

            const remainingMarbles = [];
            for (const [row, col, dir] of nextMarbles) {
                const key = `${row}-${col}`;

                if (countGrid.get(key) === 1) {
                    remainingMarbles.push([row, col, dir]);
                }
            }

            currentMarbles = remainingMarbles;
        }

        result.push(currentMarbles.length);
    }

    return result.join("\n");
}

console.log(solve());

// Helpers
function invertDirection(direction) {
    if (direction === "U") {
        return "D";
    }

    if (direction === "D") {
        return "U";
    }

    if (direction === "L") {
        return "R";
    }

    if (direction === "R") {
        return "L";
    }

    return direction
}
