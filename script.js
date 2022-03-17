const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false; 

function sendNumberValue (number) {
    //Replace current display value if first value is entered
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        let displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number; 
    }
}

function addDecimal() {
    //if operator pressed, don't add decimal
    if(awaitingNextValue) {
        return;
    }
    //check if there is no decimal, if so add one at the end
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    //Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue , currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        console.log("calculation", calculation); 
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true; //after clicking opeartor we are now ready to store it in another variable
    operatorValue = operator;
    

}

const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=": (firstNumber, secondNumber) => secondNumber,
}

inputBtns.forEach((inputBtn)=> {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener("click", () => useOperator(inputBtn.value));

    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener("click", addDecimal);
    }
});

// Reset Display, all values

function resetAll() {
    calculatorDisplay.textContent = "0";
    firstValue = 0;
    opeartorValue = "";
    awaitingNextValue = false;
}

//Event listener for clear
clearBtn.addEventListener("click", resetAll);