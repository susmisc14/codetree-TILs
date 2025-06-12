const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, k] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 1; i <= n; i++) {
    arr.push(Number(input[i]));
}

// Please Write your code here.
let left = 0;
let right = n - 1;
let result = 0;

while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum <= k) {
        result++;
        right--;
    } else {
        right--;
    }
}

console.log(result);