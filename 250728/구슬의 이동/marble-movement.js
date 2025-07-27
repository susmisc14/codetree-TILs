const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M, T, K] = input[0].split(" ").map(Number);

// Please Write your code here.
let marbles = [];
for (let i = 1; i <= M; i++) {
  const [r, c, d, v] = input[i].split(" ");
  marbles.push([Number(r - 1), Number(c - 1), d, Number(v), i]);
}

const directionMap = {
    U: [-1, 0, "D"],
    D: [1, 0, "U"],
    L: [0, -1, "R"],
    R: [0, 1, "L"]
}

function solve() {
    const cycle = 2 * (N - 1);

    for (let time = 0; time < T; time++) {
        const nextMarbles = [];
        for (let i = 0; i < marbles.length; i++) {
            const [row, col, direction, velocity, id] = marbles[i];
            let nextRow = row;
            let nextCol = col;
            let nextDirection = direction;

            if (direction === 'U' || direction === 'D') {
                let currentTime = (direction === 'U') ? cycle - row : row;
                currentTime = (currentTime + velocity) % cycle;

                if (currentTime < N) {
                    nextRow = currentTime;
                    nextDirection = 'D';
                } else {
                    nextRow = cycle - currentTime;
                    nextDirection = 'U';
                }
            } else {
                let currentTime = (direction === 'L') ? cycle - col : col;
                currentTime = (currentTime + velocity) % cycle;
                
                if (currentTime < N) {
                    nextCol = currentTime;
                    nextDirection = 'R';
                } else {
                    nextCol = cycle - currentTime;
                    nextDirection = 'L';
                }
            }

            nextMarbles.push([nextRow, nextCol, nextDirection, velocity, id]);
        }

        const grid = new Map();
        for (const marble of nextMarbles) {
            // 키 생성 시 숫자 키를 사용하는 것이 문자열보다 약간 더 효율적입니다.
            const key = marble[0] * N + marble[1];
            const marbles = grid.get(key) || [];
            grid.set(key, [...marbles, marble]);
        }

        const remainingMarbles = [];
        for (const marbles of grid.values()) {
            if (marbles.length > K) {
                marbles.sort((a, b) => (a[3] !== b[3] ? b[3] - a[3] : b[4] - a[4]));
                remainingMarbles.push(...marbles.slice(0, K));
            } else {
                remainingMarbles.push(...marbles);
            }
        }

        marbles = remainingMarbles;
    }

    return marbles.length;
}

console.log(solve());