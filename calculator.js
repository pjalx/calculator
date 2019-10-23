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
}

function calulate(e) {
    if (this.classList.contains('syms')) {
        switch (this.id) {
            case '=':
                if (int1 && int2) {
                 operate(op, int1, int2);
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
                alert(this.id);
        }
    }
}


BUTTONS.forEach(button => button.addEventListener('click', calulate));
/*
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
*/