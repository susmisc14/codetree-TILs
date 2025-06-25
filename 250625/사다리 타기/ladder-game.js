const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].trim().split(' ').map(Number);
const lines = input.slice(1, 1 + m).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
function solve() {
    const destination = play(lines);

    const result = (function recursive(index, keptLines) {
        if (index === m) {
            const result = play(keptLines);
            if (areArrayEqual(result, destination)) {
                return keptLines.length;
            }

            return Infinity;
        };

        const resultWhenSkipped = recursive(index + 1, keptLines);
        const resultWhenKept = recursive(index + 1, [...keptLines, lines[index]]);

        return Math.min(resultWhenSkipped, resultWhenKept);
    })(0, []);

    return result;
}

console.log(solve());

// helpers
function play (lines) {
    let result = [];

    for (let x = 1; x <= n; x++) {
        let cx = x;

        const newLines = lines.map((line) => [...line]);
        const sortedLines = newLines.sort((a, b) => a[1] - b[1]);
        
        for (const line of sortedLines) {
            if (line[0] === cx) {
                cx++;
            } else if (line[0] === cx - 1) {
                cx--;
            }
        }

        result.push(cx);
    }

    return result;
}

function areArrayEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}