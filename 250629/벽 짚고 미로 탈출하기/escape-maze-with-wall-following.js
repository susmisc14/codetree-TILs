const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const DIR_NUM = 4;

// 변수 선언 및 입력
const n = Number(input[0]);
let [currX, currY] = input[1].split(' ').map(Number);
const a = [0].concat(input.slice(2, 2 + n).map(line => [0].concat(line.trim().split(''))));

// 미로 탈출이 불가능한지 여부를 판단하기 위해
// 동일한 위치에 동일한 방향으로 진행했던 적이 있는지를
// 표시해주는 배열입니다.
const visited = Array.from(Array(n + 1), () => 
                Array.from(Array(n + 1), () =>
                Array(DIR_NUM).fill(false)));
let elapsedTime = 0;

// 처음에는 우측 방향을 바라보고 시작합니다.
let currDir = 0;

// 범위가 격자 안에 들어가는지 확인합니다.
function inRange(x, y) {
    return 1 <= x && x <= n && 1 <= y && y <= n;
}

// 해당 위치에 벽이 있으면 이동이 불가합니다.
function wallExist(x, y) {
    return inRange(x, y) && a[x][y] === '#';
}

// 조건에 맞춰 움직여봅니다.
function simulate() {
    // 현재 위치에 같은 방향으로 진행한 적이 이미 있었는지 확인합니다.
    // 이미 한 번 겪었던 상황이라면, 탈출이 불가능 하다는 의미이므로 
    // -1을 출력하고 프로그램을 종료합니다.
    if (visited[currX][currY][currDir]) {
        console.log(-1);
        process.exit(0);
    }
    
    // 현재 상황이 다시 반복되는지를 나중에 확인하기 위해
    // 현재 상황에 해당하는 곳에 visited 값을 True로 설정합니다.
    visited[currX][currY][currDir] = true;
    
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    
    const nextX = currX + dx[currDir], nextY = currY + dy[currDir];
    
    // Step1
    
    // 바라보고 있는 방향으로 이동하는 것이 불가능한 경우에는
    // 반 시계 방향으로 90' 방향을 바꿉니다.
    if (wallExist(nextX, nextY)) {
        currDir = (currDir - 1 + 4) % 4;
    }
    // Step2
    
    // Case1
    // 바라보고 있는 방향으로 이동하는 것이 가능한 경우 중
    // 바로 앞이 격자 밖이라면 탈출합니다.
    else if (!inRange(nextX, nextY)) {
        currX = nextX; currY = nextY;
        elapsedTime += 1;
    }
    // Case 2 & Case 3
    // 바로 앞이 격자 안에서 이동할 수 있는 곳이라면
    else {
        // 그 방향으로 이동했다 가정했을 때 바로 오른쪽에 짚을 벽이 있는지 봅니다.
        const rx = nextX + dx[(currDir + 1) % 4];
        const ry = nextY + dy[(currDir + 1) % 4];
        
        // Case2
        // 그대로 이동해도 바로 오른쪽에 짚을 벽이 있다면
        // 해당 방향으로 한 칸 이동합니다.
        if (wallExist(rx, ry)) {
            currX = nextX; currY = nextY;
            elapsedTime += 1;
        }
        // Case3
        // 그렇지 않다면 2칸 이동후 방향을 시계방향으로 90' 방향을 바꿉니다.
        else {
            currX = rx; currY = ry;
            currDir = (currDir + 1) % 4;
            elapsedTime += 2;
        }
    }
}

// 격자를 빠져나오기 전까지 계속 반복합니다.
while (inRange(currX, currY)) {
    // 조건에 맞춰 움직여봅니다.
    simulate();
}

console.log(elapsedTime);
