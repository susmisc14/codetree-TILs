const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const sequence = input[1].split(" ").map(Number);

// Please Write your code here.
const total = sequence.reduce((acc, current) => acc + current, 0);

if (total % 2 !== 0) {
    console.log("No");
    return;
}

const targetSum = total / 2;

const dp = new Array(targetSum + 1).fill(false);
dp[0] = true;

for (const number of sequence) {
    for (let sum = targetSum; sum >= number; sum--) {
        if (dp[sum - number]) {
            dp[sum] = true;
        }
    }
}

const result = dp[targetSum] ? "Yes" : "No";
console.log(result);