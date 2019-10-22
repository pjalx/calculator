const BUTTONS = document.querySelectorAll('.butts');
const DISPLAY = document.getElementById('disp');
let opstring = '';
let int1 = '';
let int2 = '';
let op = '';

function add (num1, num2) {
    return +num1 + +num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function operate (operator, num1, num2) {
    if (operator == '+') {
        DISPLAY.textContent = add(num1, num2);
    }
}

BUTTONS.forEach(button => button.addEventListener('click', function(e) {
    if (this.id == '=' ) {
        DISPLAY.textContent = '';
        operate(op, int1, int2)
    }
    if (this.classList.contains('syms')) {
        if (!op) {
            op = this.textContent;
            opstring += this.textContent;
            DISPLAY.textContent = '';
        }
    }
    if (this.classList.contains('nums')) {
        if (!op) {
            opstring +=this.textContent;
            int1 += this.textContent;
            DISPLAY.textContent += this.textContent;
            console.log(opstring);
        }
        else if (op) {
            opstring +=this.textContent;
            int2 += this.textContent;
            DISPLAY.textContent += this.textContent;
            console.log(opstring);
        }
    }    
}));