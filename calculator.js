const BUTTONS = document.querySelectorAll('.butts');
const DISPLAY = document.getElementById('disp');
let opstring = '';
let numMode = true;
let opMode = false;
let equalsMode = false;
let opArray = [];


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

function operate(arr) {
    console.log(arr);
    opstring = +arr[0] + +arr[2];
}

/*
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
*/

function calulate(e) {
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
                if (numMode) {
                    opstring += `${this.textContent}`;
                    opMode = true;
                }
            }
        }
        
    if (this.classList.contains('syms')) {
        if (opMode || this.id == 'C') {
            switch (this.id) {
                case '=':
                    opArray = opstring.split(' ');
                    //opstring = '';
                    operate(opArray);
                    /*
                    opArray = opstring.split(' ');
                    opstring += ` ${this.textContent} answer to come`;
                    */
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    opstring += ` ${this.textContent} `;
                    break;    
                case 'C':
                    opstring = '';
                    opArray = [];
                    break;
            }
        }
        opMode = false;
    }
    DISPLAY.textContent = opstring;
}

/*
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
*/

BUTTONS.forEach(button => button.addEventListener('click', calulate));
