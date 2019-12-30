window.onload = function() {

let equation = [];
let currentNum = '';
let lastNum = null;
const displayButtons = document.querySelectorAll(".btn");
const displayWindow = document.querySelector('#displayNumbers');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const message = document.querySelector('#message');

//CALCULATE & OPERATE FUNCTIONS

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, numOne, numTwo) => {
switch(operator) {
    case '+': return add(numOne, numTwo);
    case '-': return subtract(numOne, numTwo);
    case '*': return multiply(numOne, numTwo);
    case '/': return divide(numOne, numTwo);
    default: return 0;
  }
};

//SOLVING EQUATIONS

const solve = () => {
    if(equation.length === 0) return;
    if(currentNum !== '') equation.push(currentNum);
    if(isNaN(equation[equation.length - 1])) return;
    console.log(equation);
    while(equation.length > 1) {
        let curIndex;
        if(equation.indexOf('/') !== -1) {
            curIndex = equation.indexOf('/');
        } else if (equation.indexOf('*') !== -1) {
            curIndex = equation.indexOf('*');
        } else if (equation.indexOf('+') !== -1) {
            curIndex = equation.indexOf('+');
        } else if(equation.indexOf('-') !== -1) {
            curIndex = equation.indexOf('-');
        } else break;

        const result = +operate(equation[curIndex], +equation[curIndex - 1], +equation[curIndex + 1]).toFixed(2);
        equation.splice(curIndex - 1, 3, result);
    }
    displayWindow.textContent = equation.join('');
    if(equation[0] === Infinity) displayWindow.textContent = 'Can\'t divide by 0!'
    equation = [];
    currentNum = '';
};

//DISPLAY & EVENT LISTENER FUNCTIONS

displayButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        message.textContent = '';
        const val = e.target.value;
        if(val !== '.' && isNaN(val) && currentNum !== '') {
            equation.push(currentNum);
            equation.push(val);
            currentNum = '';
        } else if(!isNaN(val) || val === '.') {
            if(val === '.' && currentNum.indexOf('.') !== -1) return;
            currentNum += val;
            lastNum += val;
        } else {
            return;
        }
        displayWindow.textContent = `${equation.join('')}${currentNum}`;
    })
});

//BACKSPACE, CLEAR & EQUALS EVENT LISTENERS

//Backspace is not working properly!!!!  Will Come back to fix it.
//function deleteCharacter() {
//currentNum = currentNum.slice(0, -1);
//}

//backspace.addEventListener('click', () => deleteCharacter())
equals.addEventListener('click', () => solve());
clear.addEventListener('click', () => {
    equation = [];
    currentNum = '';
    displayWindow.textContent = '';
});
}
