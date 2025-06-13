const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);

// Please Write your code here.

function solve(n) {
    let result = [0, 1, 2];
    for (let i = 3; i <= n; i++) {
        result.push((result[i - 1] + result[i - 2]) % 10007);
    }

    return result[n];
}

console.log(solve(n))