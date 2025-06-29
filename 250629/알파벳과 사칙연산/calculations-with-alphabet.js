const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const expression = input[0];

// Please Write your code here.
const ALPHABETS = ["a", "b", "c", "d", "e", "f"];

function solve() {
    const result = (function recursive(index, assignedNumbers) {
        if (index === 6) {
            const newExpression = ALPHABETS.reduce(
                (expression, alphabet, i) => {
                    const regex = new RegExp(alphabet, "g");
                    return expression.replace(regex, assignedNumbers[i]);
                },
                expression
            );

            return calculateExpression(newExpression);
        }

        let maxValue = Number.MIN_SAFE_INTEGER;

        for (let number = 1; number <= 4; number++) {
            const newNumbers = [...assignedNumbers, number];
            maxValue = Math.max(recursive(index + 1, newNumbers), maxValue);
        }

        return maxValue;
    })(0, []);

    return result;
}

console.log(solve());

// helpers
function calculateExpression(expression) {
    const numbers = expression.match(/\d+/g).map(Number);
    const operators = expression.match(/[+\-*/]/g) || [];

    let result = numbers[0];
    operators.forEach((operator, i) => {
        const nextNumber = numbers[i + 1];

        switch (operator) {
            case "+": {
                result += nextNumber;
                break;
            }

            case "-": {
                result -= nextNumber;
                break;
            }

            case "*": {
                result *= nextNumber;
                break;
            }
        }
    });

    return result;
}