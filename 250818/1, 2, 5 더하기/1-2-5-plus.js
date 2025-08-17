const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const numbers = [1, 2, 5];

// Please write your code here.
const MODULO = 10007;

const dp = new Array(N + 1).fill(0);
dp[0] = 1;

for (let i = 1; i <= N; i++) {
    for (const number of numbers) {
        if (i >= number) {
            dp[i] = (dp[i] + dp[i - number]) % MODULO;
        }
    }
}

const result = dp[N];
console.log(result);