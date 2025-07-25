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

            let [row, col, direction, velocity] = marbles[i];

            const moveCount = velocity % (2 * (N - 1));

            for (let j = 0; j < moveCount; j++) {
                let nextR = row + directionMap[direction][0];
                let nextC = col + directionMap[direction][1];

                if (!inRange(nextR, nextC)) {
                    direction = directionMap[direction][2];
                }
                
                row += directionMap[direction][0];
                col += directionMap[direction][1];
            }
            
            marbles[i] = [row, col, direction, velocity];
            grid[row][col].push(i);
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