const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
let word = input[0];
// Please Write your code here.
function solve(word) {
    const dictionary = {};
    const n = word.length;
    let count = 0;
    let length = Number.MAX_SAFE_INTEGER;

    while (count !== n) {
        let number = 1;
        for (let i = 0; i < n; i++) {
            const letter = word[i];
            const prev = word[Math.max(i - 1, 0)];

            if (letter !== prev) {
                number++;
            }

            if (dictionary[`${letter}-${number}`]) {
                dictionary[`${letter}-${number}`] += 1
            } else {
                dictionary[`${letter}-${number}`] = 1;
            }
        }

        number = 1;

        let result = "";
        for (const [key, value] of Object.entries(dictionary)) {
            result += `${key[0]}${value}`;

            delete dictionary[key];
        }

        word = word.slice(1) + word[0];
        length = Math.min(result.length, length);

        count++;
    }

    return length;
}

console.log(solve(word));