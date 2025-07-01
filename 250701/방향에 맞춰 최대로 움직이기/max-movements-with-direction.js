const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const num = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));
const moveDir = input.slice(1 + n, 1 + 2 * n).map(line => line.split(' ').map(Number));
const [r, c] = input[1 + 2 * n].split(' ').map(Number);

// Please Write your code here.
const dx = [0, 1, 1, 1, 0, -1, -1, -1];
const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

function solve() {
    // 1-base를 0-base로 수정합니다.
    const startX = c - 1;
    const startY = r - 1;

    const result = (function recursive(x, y) {
        const dir = moveDir[y][x] - 1;

        // Recursive Step
        let nx = x + dx[dir];
        let ny = y + dy[dir];
        
        let maxCount = 0;

        while (inRange(nx, ny)) {
            if (num[y][x] < num[ny][nx]) {
                maxCount = Math.max(recursive(nx, ny) + 1, maxCount);
            }

            nx = nx + dx[dir];
            ny = ny + dy[dir];
        }

        return maxCount;
    })(startX, startY);

    return result;
}

console.log(solve());

// helpers
function inRange (x, y) {
    return x >= 0 && x < n && y >= 0 && y < n;
}