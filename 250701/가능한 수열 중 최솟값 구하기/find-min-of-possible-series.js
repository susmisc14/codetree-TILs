const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);

// Please Write your code here.
const NUMBERS = [4, 5, 6];

function solve() {
    const result = (function recursive(sequence) {
        if (sequence.length === n) {
            return sequence.join("");
        }
        
        for (const number of NUMBERS) {
            const nextSequence = [...sequence, number];

            if (!hasRepeatedSequence(nextSequence)) {
                const foundSequence = recursive(nextSequence);
                
                if (foundSequence !== null) {
                    return foundSequence;
                }
            }
        };

        return null;
    })([]);
    
    return result;
}

console.log(solve());

// helpers
function hasRepeatedSequence(sequence) {
  const length = sequence.length;

  for (let i = 1; i <= Math.floor(length / 2); i += 1) {
    const right = sequence.slice(length - i);
    const left = sequence.slice(length - 2 * i, length - i);

    if (JSON.stringify(right) === JSON.stringify(left)) {
      return true;
    }
  }

  return false;
}