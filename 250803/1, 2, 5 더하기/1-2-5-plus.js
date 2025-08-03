const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);

// Please write your code here.
const numbers = [1, 2, 5];

function solve() {
    const dp = new Array(N + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= N; i++) {
        for (const number of numbers) {
            if (number <= i) {
                dp[i] = (dp[i] + dp[i - number]) % 10007;
            }
        }
    }

    return dp[N];
}

console.log(solve());