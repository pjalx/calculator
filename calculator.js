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
    return +num1 - +num2;
}

function multiply (num1, num2) {
    return +num1 * +num2;
}

function divide (num1, num2) {
    return +num1 / +num2;
}

function operate (operator, num1, num2) {
    if (operator == '+') {
        DISPLAY.textContent = add(num1, num2);
    }
    else if (operator == '-') {
        DISPLAY.textContent = subtract(num1, num2);
    }
    else if (operator == '*') {
        DISPLAY.textContent = multiply(num1, num2);
    }
    else if (operator == '/') {
        DISPLAY.textContent = divide(num1, num2);
    }
}

function calulate(e) {
    if (this.classList.contains('syms')) {
        switch (this.id) {
            case '=':
                if (int1 && int2) {
                 opstring += this.textContent;
                 operate(op, int1, int2);
                }
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                if (int1) {
                    opstring += this.id;
                    op = this.textContent;
                    DISPLAY.textContent += ` ${this.textContent} `;
                }
                break;    
            case 'C':
                int1 = '';
                int2 = '';
                op = '';
                opstring = '';
                DISPLAY.textContent = '';
                break;
        }
    }
    if (this.classList.contains('nums')) {
        switch (this.id) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                opstring += this.textContent;
                if (!op) {
                    int1 += this.textContent;
                    DISPLAY.textContent += this.textContent;
                }
                else if (op) {
                    int2 += this.textContent;
                    DISPLAY.textContent += this.textContent;
                }
        }
    }
}


BUTTONS.forEach(button => button.addEventListener('click', calulate));
