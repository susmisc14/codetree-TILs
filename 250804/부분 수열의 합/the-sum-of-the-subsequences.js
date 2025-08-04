const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const sequence = input[1].split(" ").map(Number);

// Please Write your code here.
function solve() {
    const dp = new Array(M + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 0; i < N; i++) {
        for (let j = M; j >= 0; j--) {
            const number = sequence[i];
            if (j >= number && dp[j - number] !== Infinity) {
                dp[j] = Math.min(dp[j], dp[j - number] + 1);
            }
        }
    }

    return dp[M] === Infinity ? "No" : "Yes";
}

console.log(solve());