const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const sequence = input[1].split(" ").map(Number);

// Please Write your code here.
function solve() {
    const dp = new Array(N + 1).fill(false);
    dp[0] = true;

    const total = sequence.reduce((acc, current) => acc + current, 0);

    for (let i = 1; i <= N; i++) {
        for (let j = total; j >= 0; j--) {
            if (dp[j - sequence[i]]) dp[j] = true;
        }
    }

    let result = Infinity;

    for (let i = Math.floor(total / 2); i >= 0; i--) {
        if (dp[i]) {
            const a = i;
            const b = total - i;
            
            result = Math.abs(b - a);

            break;
        }
    }

    return result;
}

console.log(solve());