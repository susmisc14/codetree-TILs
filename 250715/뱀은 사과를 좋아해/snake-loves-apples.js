const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const positions = input.slice(1, 1 + M).map(line => line.split(' ').map(Number));
const movements = input.slice(1 + M, 1 + M + K).map(line => line.split(' '));

// Please Write your code here.
function solution() {
    const eaten = Array.from({ length: N }, () => new Array(N).fill(-1));
    for (const position of positions) {
        eaten[position[0] - 1][position[1] - 1] = 1;
    }

    const snake = [[0, 0]];

    const progressed = Array.from({ length: N }, () => new Array(N).fill(false));
    progressed[0][0] = true;

    const directionMap = {
        U: [-1, 0],
        D: [1, 0],
        L: [0, -1],
        R: [0, 1],
    }

    let direction = "R";
    let time = 0;

    for (const movement of movements) {
        const distance = Number(movement[1]);

        direction = movement[0];

        for (let i = 0; i < distance; i++) {
            time += 1;

            const [headRow, headCol] = snake[0];
            const [tailRow, tailCol] = snake[snake.length - 1];
            const [dr, dc] = directionMap[direction];
            const nextRow = headRow + dr;
            const nextCol = headCol + dc;

            if (!inRange(nextRow, nextCol)) {
                return time;
            }

            if (progressed[nextRow][nextCol]) {
                if (!(nextRow === tailRow && nextCol === tailCol) || eaten[nextRow][nextCol] === 1) {
                    return time;
                }
            }

            snake.unshift([nextRow, nextCol]);
            progressed[nextRow][nextCol] = true;

            if (eaten[nextRow][nextCol] === 1) {
                eaten[nextRow][nextCol] = 0;
            } else {
                snake.pop();
                progressed[tailRow][tailCol] = false;
            }
        }
    }

    return time;
}

console.log(solution());

// helpers
function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}