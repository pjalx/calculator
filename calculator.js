const BUTTONS = document.querySelectorAll('.butts');
const DISPLAY = document.getElementById('disp');
let opstring = `0`;
let interResult;
let numMode = true;
let opMode = false;
let equaledMode = false;
let backMode = false;
let opArray = [];

DISPLAY.textContent = opstring;

function formulate(e) {
    if (this.classList.contains('back') && backMode) {
        if (/[0-9.]/.test(opstring[opstring.length - 1])) {
            opstring = opstring.substring(0, opstring.length - 1) || `0`;
            DISPLAY.textContent = opstring;
        }
    }

    if (this.classList.contains('nums')) {
        switch (this.id) {
            case '.':
                if (!opstring.split(' ').pop().includes('.') && numMode) {
                    if (equaledMode) {
                        opstring = `${interResult}${this.textContent}`;
                        interResult = ``;
                        equaledMode = false;
                    }else {
                        opstring += `${this.textContent}`;
                    }
                }
                backMode = true;
                opMode = false;
                break;
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
                if (equaledMode) {
                    opstring = `0`;
                    equaledMode = false;
                    interResult = ``;
                }
                if (numMode) {
                   if (opstring == `0`) {
                        opstring = ``;
                    }
                    opstring += `${this.textContent}`;
                    opMode = true;
                    backMode = true;
                }
        }
    }

    if (this.classList.contains('syms')) {
        if (opMode || this.id == 'C' || opstring === '0') {
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
                    opstring = `0`;
                    opArray = [];
                    interResult = ``;
                    equaledMode = false;
                    numMode = true;
                    break;
            }
        }

        if (equaledMode) {
            switch (this.id) {
                case '+':
                case '-':
                case '*':
                case '/':
                    opstring = `${interResult} ${this.textContent} `;
                    equaledMode = false;
                    break;
            }

        }

        opMode = false;
        backMode = false;

        if(!opMode && !equaledMode) {
            backMode = true;
        }
    }
    DISPLAY.textContent = opstring;
    
    console.log(`this.id = ${this.id}  interResult = ${interResult}  opstring = ${opstring}  opMode = ${opMode}  equaledMode = ${equaledMode}  backMode = ${backMode}`);
}

function operate(arr) {
    let nArr = arr.map(str => isNaN(str) ? str : +str);
    let ranNum = function() {
        let min = 0;
        let max = 3;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let snarkResponse = ``;
    const SNARK = [`Oh The Humanity, It is a wonder you can walk upright!`, `Welp, you went and did that then, didn't you?!? DIDN'T YOU!!!???`, `To Err is Human, to divide by zero is so grevious as to render any attempt at forgivness futile.`, `Take that junk to the mall homie!`];
    const ADD = (aAarr) => aAarr[0] + aAarr[2];
    const SUBTRACT = (sArr) => sArr[0] - sArr[2];
    const MULTIPLY = (mArr) => mArr[0] * mArr[2];
    const DIVIDE = (dArr) => {
        if (dArr[0] == 0 || dArr[2] == 0) {
            return snarkResponse = SNARK[ranNum()];
        }else {
            return dArr[0] / dArr[2];
        }
    };
    let quotientOrProduct;
    let sumOrDifference;
    let tempSlice;

    quotientOrProduct = nArr.findIndex(index => /^[\/*]$/.test(index));
    while (quotientOrProduct != -1) {
        tempSlice = nArr.slice(quotientOrProduct - 1, quotientOrProduct + 2);
        if (tempSlice[1] == '/') {
            tempSlice = DIVIDE(tempSlice);
        }
        else if (tempSlice[1] == '*') {
            tempSlice = MULTIPLY(tempSlice);
        }
        nArr.splice(quotientOrProduct - 1, 3, tempSlice);
        quotientOrProduct = nArr.findIndex(index => /^[\/*]$/.test(index));
    }

    sumOrDifference = nArr.findIndex(index => /^[+-]$/.test(index));
    while (sumOrDifference != -1) {
        tempSlice = nArr.slice(sumOrDifference - 1, sumOrDifference + 2);
        if (tempSlice[1] == '+') {
            tempSlice = ADD(tempSlice);
        }
        else if (tempSlice[1] == '-') {
            tempSlice = SUBTRACT(tempSlice);
        }
        nArr.splice(sumOrDifference - 1, 3, tempSlice);
        sumOrDifference = nArr.findIndex(index => /^[+-]$/.test(index));
    }

    (snarkResponse) ? numMode = false : numMode = true;
    (snarkResponse) ? equaledMode = false : equaledMode = true;
    (snarkResponse) ? backdMode = false : backMode = true;
    (snarkResponse) ? interResult = `` : interResult = nArr.join();
    (snarkResponse) ? opstring = snarkResponse : opstring += ` = ${nArr.join()}`;
}

BUTTONS.forEach(button => button.addEventListener('click', formulate));
document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if(e.key == 'Backspace') {
        document.body.style.backgroundColor = 'gold';
    }
});