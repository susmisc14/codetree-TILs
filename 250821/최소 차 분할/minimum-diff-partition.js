const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const sequence = input[1].split(" ").map(Number);

// Please Write your code here.
const total = sequence.reduce((acc, current) => acc + current, 0);

const DP_SIZE = total + 1;

const dp = new Array(DP_SIZE).fill(false);
dp[0] = true;

for (const number of sequence) {
    for (let i = total; i >= number; i--) {
        if (dp[i - number]) dp[i] = true;
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

console.log(result);