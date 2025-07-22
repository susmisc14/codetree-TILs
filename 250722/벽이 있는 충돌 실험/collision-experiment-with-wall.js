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
        marbles.push([Number(x), Number(y), d]);
    }

    queue.push([N, M, marbles])
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
        const grid = Array.from({ length: N }, () => new Array(N).fill(0));
        let newMarbles = marbles.map(([row, col, direction]) => [row - 1, col - 1, direction]);

        const inRange = (row, col) => row >= 0 && row < N && col >= 0 && col < N;

        newMarbles.forEach((marble) => {
            grid[marble[0]][marble[1]] = 1;
        });
        
        for (let time = 0; time < N * 2; time++) {
            newMarbles.forEach((marble, i) => {
                const nextRow = marble[0] + directionMap[marble[2]][0];
                const nextCol = marble[1] + directionMap[marble[2]][1];

                if (inRange(nextRow, nextCol)) {
                    newMarbles[i] = [nextRow, nextCol, marble[2]];
                    grid[marble[0]][marble[1]] = Math.max(grid[marble[0]][marble[1]] - 1, 0);
                    grid[nextRow][nextCol] += 1;
                } else {
                    newMarbles[i] = [marble[0], marble[1], invertDirection(marble[2])];
                }
            })

            for (let row = 0; row < N; row++) {
                for (let col = 0; col < M; col++) {
                    if (grid[row][col] > 1) {
                        newMarbles = newMarbles.filter((marble) => marble[0] !== row || marble[1] !== col);
                        grid[row][col] = 0;
                    }
                }
            }
        }

        result.push(newMarbles.length);
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