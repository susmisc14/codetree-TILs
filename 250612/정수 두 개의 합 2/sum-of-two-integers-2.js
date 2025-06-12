const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, k] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 1; i <= n; i++) {
    arr.push(Number(input[i]));
}

// Please Write your code here.
arr.sort((a, b) => a - b);

let result = 0;

for (let left = 0; left < n; left++) {
    if (arr[left] >= k) break;

    let right = left + 1;

    while (right < n) {
        if (arr[left] + arr[right] <= k) {
            result++;
        }

        right++;
    }
}

console.log(result);