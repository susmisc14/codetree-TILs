const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const numbers = input.slice(1, Number(n) + 1).map(Number);

// Please Write your code here.
let result = [...numbers];

while (true) {
    const temp = [];
    let bombed = false;

    let i = 0;
    while (i < result.length) {
        let j = i;
        while (j < result.length && result[j] === result[i]) {
            j += 1;
        }

        const groupSize = j - i;
        const currentGroup = result.slice(i, j);

        if(groupSize < m) {
            temp.push(...currentGroup);
        } else {
            bombed = true;
        }

        i = j;
    }

    if (!bombed) {
        break;
    }

    result = temp;
}

console.log(result.length);
console.log(result.join("\n"));
