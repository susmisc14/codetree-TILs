const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const positions = input.slice(1, 1 + M).map(line => line.split(' ').map(Number));
const movements = input.slice(1 + M, 1 + M + K).map(line => line.split(' '));

// Please Write your code here.
function solution() {
    let coords = positions.map((position) => [position[0] - 1, position[1] - 1]);
    
    const directionMap = {
        U: [-1, 0],
        D: [1, 0],
        L: [0, -1],
        R: [0, 1],
    }
    
    const snake = [[0, 0]];
    let direction = "R";
    let time = 0;

    for (const movement of movements) {
        const distance = Number(movement[1]);
        
        direction = movement[0];

        for (let i = 0; i < distance; i++) {
            time++;

            const [currentRow, currentCol] = snake[0];
            const [dr, dc] = directionMap[direction];
            const nextRow = currentRow + dr;
            const nextCol = currentCol + dc;

            if (!inRange(nextRow, nextCol)) {
                return time;
            }

            snake.unshift([nextRow, nextCol]);

            if (coords.some((position) => position.join(" ") === `${nextRow} ${nextCol}`)) {
                coords = coords.filter((position) => position.join(" ") !== `${nextRow} ${nextCol}`);
            } else {
                snake.pop();
            }

            if (isCrash(snake)) {
                return time;
            }
        }
    }

    return time;
}

console.log(solution());

// helpers
function isCrash(snake) {
    if (snake.length <= 1) {
        return false;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].join(" ") === snake[i].join(" ")) {
            return true;
        }
    }

    return false;
}

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}