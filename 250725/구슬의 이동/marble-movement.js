const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M, T, K] = input[0].split(" ").map(Number);


// Please Write your code here.
let marbles = [];
for (let i = 1; i <= M; i++) {
  const [r, c, d, v] = input[i].split(" ");
  marbles.push([Number(r - 1), Number(c - 1), d, Number(v)]);
}

const directionMap = {
    U: [-1, 0, "D"],
    D: [1, 0, "U"],
    L: [0, -1, "R"],
    R: [0, 1, "L"]
}

function solve() {
    for (time = 0; time < T; time++) {
        const grid = Array.from({ length: N }, () => Array.from({ length: N }, () => []));

        for (let i = 0; i < M; i++) {
            if (marbles[i] === null) continue;

            const [row, col, direction, velocity] = marbles[i];
            let nextRow = row + directionMap[direction][0] * velocity;
            let nextCol = col + directionMap[direction][1] * velocity;

            if (inRange(nextRow, nextCol)) {
                marbles[i][0] = nextRow;
                marbles[i][1] = nextCol;
            } else {
                if (Math.floor(nextRow / N) % 2 === 0) {
                    nextRow = Math.abs(nextRow % N);
                    marbles[i][0] = nextRow;
                } else {
                    nextRow = Math.abs(nextRow % N);
                    marbles[i][0] = nextRow;
                    marbles[i][2] = directionMap[direction][2];
                }

                if (Math.floor(nextCol / N) % 2 === 0) {
                    nextCol = Math.abs(nextCol % N);
                    marbles[i][1] = nextCol;
                } else {
                    nextCol = Math.abs(nextCol % N);
                    marbles[i][1] = nextCol;
                    marbles[i][2] = directionMap[direction][2];
                }
            }

            
            grid[nextRow][nextCol].push(i);
        }

        for (let i = 0; i < M; i++) {
            if (marbles[i] === null) continue;

            const [row, col] = marbles[i];
            const numbers = grid[row][col];

            if (numbers.length > K) {
                numbers.sort((a, b) => {
                    if (!(marbles[a][3] === marbles[b][3])) {
                        return marbles[b][3] - marbles[a][3];
                    } else {
                        return b - a;
                    }
                });

                const removedNumbers = numbers.splice(K);
                
                for (let removeNumber of removedNumbers) {
                    marbles[removeNumber] = null;
                }
            }
        }
    }
    
    const remainingMarbles = marbles.filter((marble) => marble !== null);

    return remainingMarbles.length
}

console.log(solve());

// Helpers

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}