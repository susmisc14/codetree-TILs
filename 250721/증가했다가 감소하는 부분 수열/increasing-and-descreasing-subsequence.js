const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const sequence = input[1].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const dp = Array.from({ length: N }, () => [1, 1]);

    for (let i = 1; i < N; i++) {
        for (let j = 0; j < i; j++) {
            if (sequence[j] < sequence[i]) {
                dp[i][0] = Math.max(dp[j][0] + 1, dp[i][0]);
            }

            if (sequence[j] > sequence[i]) {
                const prevMax = Math.max(dp[j][0], dp[j][1]);
                dp[i][1] = Math.max(prevMax + 1, dp[i][1]);
            }
        }
    }

    let maxLength = 0;
    for (let i = 0; i < N; i++) {
        maxLength = Math.max(dp[i][0], dp[i][1], maxLength);
    }

    return maxLength;
}

console.log(solve());