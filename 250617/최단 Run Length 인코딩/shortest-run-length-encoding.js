const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
let A = input[0];

// Please Write your code here.
function solve(input) {
    const n = input.length;
    let count = 0;
    let length = Number.MAX_SAFE_INTEGER;

    while (count !== n) {
        let result = ""

        let char = input[0];
        let numberOfChars = 0;
        for (let i = 0; i < n; i++) {
            if (input[i] === char) {
                numberOfChars++;
            } else {
                result += `${char}${numberOfChars}`;
                char = input[i];
                numberOfChars = 1;
            }
        }

        result += `${char}${numberOfChars}`;
        input = input.slice(1) + input[0];
        length = Math.min(result.length, length);

        count++;
    }

    return length;
}

console.log(solve(A));