const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);

// Please Write your code here.
function solve(n) {
    const count = (function recursive(currentLength) {
        // Base Case 1: 목표 길이를 초과하면 유효하지 않은 경로이므로 0을 반환
        if (currentLength > n) {
            return 0;
        }

        // Base Case 2: 목표 길이에 정확히 도달하면 유효한 조합 1개를 찾았으므로 1을 반환
        if (currentLength === n) {
            return 1;
        }

        // Recursive Step: 1, 22, 333, 4444를 붙이는 모든 경우의 수를 합산
        // 'i'는 붙이려는 숫자를 의미하며, 곧 추가될 길이를 의미
        let count = 0;
        for (let i = 1; i <= 4; i++) {
            count += recursive(currentLength + i);
        }

        return count;
    })(0);

    return count;
}

const result = solve(n);
console.log(result);