const BUTTONS = document.querySelectorAll('.butts');
const DISPLAY = document.getElementById('disp');
let opstring = '';
let numMode = true;
let opMode = false;
let equalsMode = false;
let opArray = [];

function operate(arr) {
    let nArr = arr.map(str => isNaN(str) ? str : +str);
    const ADD = (aAarr) => aAarr[0] + aAarr[2];
    const SUBTRACT = (sArr) => sArr[0] - sArr[2];
    const MULTIPLY = (mArr) => mArr[0] * mArr[2];
    const DIVIDE = (dArr) => dArr[0] / dArr[2];
    let quotientOrProduct;
    let sumOrDifference;
    let tempSlice;

    quotientOrProduct = nArr.findIndex(index => /^[\/*]$/.test(index));
    while (quotientOrProduct != -1) {
        tempSlice = nArr.slice(quotientOrProduct -1, quotientOrProduct +2);
        if (tempSlice[1] == '/') {
            tempSlice = DIVIDE(tempSlice);
        }
        else if (tempSlice[1] == '*') {
            tempSlice = MULTIPLY(tempSlice);
        }
        nArr.splice(quotientOrProduct -1, 3, tempSlice);
        quotientOrProduct = nArr.findIndex(index => /^[\/*]$/.test(index));
    }

    sumOrDifference = nArr.findIndex(index => /^[+-]$/.test(index));
    while (sumOrDifference != -1) {
        tempSlice = nArr.slice(sumOrDifference -1, sumOrDifference +2);
        if (tempSlice[1] == '+') {
            tempSlice = ADD(tempSlice);
        }
        else if (tempSlice[1] == '-') {
            tempSlice = SUBTRACT(tempSlice);
        }
        nArr.splice(sumOrDifference -1, 3, tempSlice);
        sumOrDifference = nArr.findIndex(index => /^[+-]$/.test(index));
    }

    equalsMode = true;    
    
    return opstring += ` = ${nArr.join()}`
}

function formulate(e) {
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
                if (equalsMode) {
                    opstring = '';
                    equalsMode = false;
                }
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
                    operate(opArray);
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

BUTTONS.forEach(button => button.addEventListener('click', formulate));
