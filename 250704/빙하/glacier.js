const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    let newGrid = grid.map((row) => [...row]);
    let count = 0;
    let time = 0;

    while (!isAllMelted(newGrid)) {
        const [remainingIce, numberOfMeltedIce] = meltIce(newGrid);
        newGrid = remainingIce;
        count = numberOfMeltedIce;
        time += 1;
    }

    return `${time} ${count}`
}

console.log(solve());
// solve();

// helpers
function isAllMelted(grid) {
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < M; col++) {
            if (grid[row][col] === 1) {
                return false;
            }
        }
    }

    return true;
}

function meltIce(grid) {
    const newGrid = grid.map((row) => [...row]);
    const visited = Array.from({ length: N }, () => new Array(M).fill(false));
    const melted = Array.from({ length: N }, () => new Array(M).fill(false));
    const queue = [[0, 0]];
    let numberOfMeltedIce = 0;
    let head = 0;

    // 시계 방향
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    while (head < queue.length) {
        const [currentRow, currentCol] = queue[head];
        head += 1;

        for (let i = 0; i < 4; i++) {
            const nextRow = currentRow + dr[i];
            const nextCol = currentCol + dc[i];
            
            if (!inRange(nextRow, nextCol)) continue;

            // Case 1. 경계면 따라가기
            if (!visited[nextRow][nextCol] && grid[nextRow][nextCol] === 0) {
                queue.push([nextRow, nextCol]);
                visited[nextRow][nextCol] = true;
            } 
            // Case 2. 경계면에 맞닿은 얼음 녹이기
            else if (!melted[nextRow][nextCol] && grid[nextRow][nextCol] === 1) {
                newGrid[nextRow][nextCol] = 0;
                melted[nextRow][nextCol] = true;
                numberOfMeltedIce += 1;
            }
        }
    }

    return [newGrid, numberOfMeltedIce];
}

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < M;
}