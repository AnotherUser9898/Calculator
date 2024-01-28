let firstNumber = "";
let secondNumber = "";
let mathematicalOperation;
let count = 0;
let numbersString = "12456789";
let operationsString = "+-*/";
let isFloat = false;
const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");
buttons.forEach((button) => {
        button.addEventListener("mouseover",() => button.style.filter = "brightness(0.75)");
        button.addEventListener("mouseout",() => button.style.filter = "brightness(1)");

})

input.addEventListener("keypress",(event) => {
        if (numbersString.includes(event.key)) {
                executeNumber(event.key);
        }
        else if (operationsString.includes(event.key)) {
                executeOperation(event.key);
        }
        event.preventDefault();
})

const allClear = document.querySelector("#all-clear");
allClear.addEventListener("click",() => {
        firstNumber = "";
        secondNumber = "";
        mathematicalOperation = "";
        count = 0;
        input.value = "";
        isFloat = false;
})

const operations = document.querySelectorAll(".operation");
operations.forEach((operation) => {
        operation.addEventListener("click",() => {
                executeOperation(operation.textContent);

        })
})

const numbers = document.querySelectorAll(".numpad-button");
numbers.forEach((number) => {
        number.addEventListener("click",() => {
               executeNumber(number.textContent);
        })
})

const equal = document.querySelector("#equals");
equal.addEventListener("click",() => {
        if (!mathematicalOperation || !secondNumber) {
                alert("The information entered is incomplete");
        } else {
                if (isFloat) {
                        let result = operate(firstNumber,mathematicalOperation,secondNumber).toFixed(5);
                        input.value = result;
                } else {
                        result = operate(firstNumber,mathematicalOperation,secondNumber);
                        input.value = result;
                }
                
                
        }
        
        
})

const backButton = document.querySelector(".back-button");
backButton.addEventListener("click",() => {
        if (count == 0) {
                firstNumber = firstNumber.slice(0,firstNumber.length - 1);
                input.value = firstNumber;
        }
        else if (mathematicalOperation && secondNumber == "") {
                mathematicalOperation = "";
                count = 0;
                input.value = input.value.slice(0,input.value.length - 1);
        }
        else {
                secondNumber = secondNumber.slice(0,secondNumber.length - 1);
                input.value = input.value.slice(0,input.value.length - 1);
        }
})

const decimalButton = document.querySelector(".decimal-button");
decimalButton.addEventListener("click",() => {
        if (count == 0) {
                firstNumber += decimalButton.textContent;
        } else {
                secondNumber += decimalButton.textContent;
        }
        input.value += decimalButton.textContent;
        isFloat = true;
})


function add(a,b) {
        return +a + +b;
}

function multiply(a,b) {
        return a * b;
}

function divide(a,b) {
        if (b == 0) {
                alert("Cannot divide by zero");
                return 0;
        }

        return a / b;
}

function subtract(a,b) {
        return a - b;
}

function operate(first,operation,second) {
        switch(mathematicalOperation) {
                case "+":
                        return add(firstNumber,secondNumber);
                        break;
                case "*":
                        return multiply(firstNumber,secondNumber);
                        break;
                case "-":
                        return subtract(firstNumber,secondNumber);
                        break;
                case "/":
                        return divide(firstNumber,secondNumber);
                        break;
        }
}

function executeOperation(content) {
        if (count == 0) {
                mathematicalOperation = content;
                count += 1;
        } else {
                let result = operate(firstNumber,mathematicalOperation,secondNumber);
                firstNumber = result;
                input.value = result;
                secondNumber = "";
                mathematicalOperation = content;
        }
        input.value += mathematicalOperation;
}

function executeNumber(content) {
        if (!mathematicalOperation) {
                firstNumber += content
        } else {
                secondNumber += content
        }
        console.log(input.value);
        input.value += content;
        console.log(input.value);
}
