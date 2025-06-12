const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, k] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 1; i <= n; i++) {
    arr.push(Number(input[i]));
}

// Please Write your code here.
let result = 0;

for (let right = 0; right < n; right++) {
    const item = arr[right];
    if (item >= k) continue;

    let left = 0;

    while (left < right) {
        if (arr[left] + item <= k) {
            result++;
        }

        left++;
    }
}

console.log(result);