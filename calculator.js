const BUTTONS = document.querySelectorAll('.butts');
const DISPLAY = document.getElementById('disp');
let opstring = `0`;
let interResult;
let numMode = true;
let opMode = false;
let equaledMode = false;
let backMode = false;
let tempArray = [];
let opArray = [];
let ranNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

DISPLAY.textContent = opstring;

function formulate(e) {
    if (e.type == 'click') {
        if (this.classList.contains('back') && backMode) {
            if (/[0-9.]/.test(opstring[opstring.length - 1])) {
                opstring = opstring.substring(0, opstring.length - 1) || `0`;
                DISPLAY.textContent = opstring;
            }
        }

        if (this.classList.contains('nums') || this.classList.contains('spec-opers')) {
            switch (this.id) {
                case 'posorneg':
                    if (numMode && opMode && !equaledMode) {
                        tempArray = opstring.split(' ');
                        /^[-]/.test(tempArray[tempArray.length - 1]) ? tempArray[tempArray.length - 1] = `${tempArray[tempArray.length - 1].slice(1)}` : tempArray[tempArray.length - 1] = `-${tempArray[tempArray.length - 1]}`;
                        opstring = tempArray.join(' ');
                        DISPLAY.textContent = opstring;
                        tempArray = [];
                    }
                    break;
                case '%':
                    if (numMode && opMode && !equaledMode) {
                        tempArray = opstring.split(' ');
                        tempArray[tempArray.length - 1] = (+tempArray[tempArray.length - 1] / 100).toString();
                        opstring = tempArray.join(' ');
                        DISPLAY.textContent = opstring;
                        tempArray = [];
                    }
                    break;
                case '.':
                    if (!opstring.split(' ').pop().includes('.') && numMode) {
                        if (equaledMode) {
                            opstring = `${interResult}${this.textContent}`;
                            interResult = ``;
                            equaledMode = false;
                            backMode = false;
                        } else {
                            opstring += `${this.textContent}`;
                            backMode = true;
                        }
                        opMode = false;
                    }
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

        if (this.classList.contains('opers')) {
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
                        tempArray = [];
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
        }

        console.log(`this.id = ${this.id}  interResult = ${interResult}  opstring = ${opstring}  opMode = ${opMode}  equaledMode = ${equaledMode}  backMode = ${backMode} And ${e.type} is the EVENT TYPE`);

    }

    if (e.type == 'keydown') {
        if ((e.code == 'Backspace' || e.code == 'Delete') && backMode) {
            if (/[0-9.]/.test(opstring[opstring.length - 1])) {
                opstring = opstring.substring(0, opstring.length - 1) || `0`;
                DISPLAY.textContent = opstring;
            }
        }

        switch (e.code) {
            case 'Minus':
                if (numMode && opMode && !equaledMode) {
                    tempArray = opstring.split(' ');
                    /^[-]/.test(tempArray[tempArray.length - 1]) ? tempArray[tempArray.length - 1] = `${tempArray[tempArray.length - 1].slice(1)}` : tempArray[tempArray.length - 1] = `-${tempArray[tempArray.length - 1]}`;
                    opstring = tempArray.join(' ');
                    DISPLAY.textContent = opstring;
                    tempArray = [];
                }
                break;
            case 'NumpadDecimal':
                if (!opstring.split(' ').pop().includes('.') && numMode) {
                    if (equaledMode) {
                        opstring = `${interResult}${e.key}`;
                        interResult = ``;
                        equaledMode = false;
                        backMode = false;
                    } else {
                        opstring += `${e.key}`;
                        backMode = true;
                    }
                    opMode = false;
                }
                break;
            case 'Digit5':
                if (e.key == '%')
                    if (numMode && opMode && !equaledMode) {
                        tempArray = opstring.split(' ');
                        tempArray[tempArray.length - 1] = (+tempArray[tempArray.length - 1] / 100).toString();
                        opstring = tempArray.join(' ');
                        DISPLAY.textContent = opstring;
                        tempArray = [];
                    }
                break;
            case 'Numpad0':
            case 'Numpad1':
            case 'Numpad2':
            case 'Numpad3':
            case 'Numpad4':
            case 'Numpad5':
            case 'Numpad6':
            case 'Numpad7':
            case 'Numpad8':
            case 'Numpad9':
                if (equaledMode) {
                    opstring = `0`;
                    equaledMode = false;
                    interResult = ``;
                }
                if (numMode) {
                    if (opstring == `0`) {
                        opstring = ``;
                    }
                    opstring += `${e.key}`;
                    opMode = true;
                    backMode = true;
                }
                break;
        }

        if (opMode || e.code == 'KeyC' || opstring === '0') {
            switch (e.code) {
                case 'NumpadEnter':
                    opArray = opstring.split(' ');
                    operate(opArray);
                    opMode = false;
                    backMode = false;
                    break;
                case 'KeyC':
                case 'End':
                    opstring = `0`;
                    opArray = [];
                    tempArray = [];
                    interResult = ``;
                    equaledMode = false;
                    numMode = true;
                    opMode = false;
                    backMode = false;
                    break;
                case 'NumpadAdd':
                case 'NumpadSubtract':
                case 'NumpadMultiply':
                case 'NumpadDivide':
                    opstring += ` ${e.key} `;
                    opMode = false;
                    backMode = false;
                    break;
            }

        }
        if (equaledMode) {
            switch (e.code) {
                case 'NumpadAdd':
                case 'NumpadSubtract':
                case 'NumpadMultiply':
                case 'NumpadDivide':
                    opstring = `${interResult} ${e.key} `;
                    equaledMode = false;
                    opMode = false;
                    backMode = false;
                    break;
            }

        }

        console.log(`interResult = ${interResult}  opstring = ${opstring}  opMode = ${opMode}  equaledMode = ${equaledMode}  backMode = ${backMode} And ${e.type} is the EVENT TYPE and  ${e.code} is the KEYCODE`);
    }

    DISPLAY.textContent = opstring;
}

function operate(arr) {
    let nArr = arr.map(str => isNaN(str) ? str : +str);
    let snarkResponse = ``;
    const SNARK = [`Oh The Humanity, It is a wonder you can walk upright!`, `Welp, you went and did that then, didn't you?!? DIDN'T YOU!!!???`, `To Err is Human, to divide by zero is so grievous as to render any attempt at forgivness futile.`, `Take that junk to the mall homie!`];
    const ADD = (aAarr) => aAarr[0] + aAarr[2];
    const SUBTRACT = (sArr) => sArr[0] - sArr[2];
    const MULTIPLY = (mArr) => mArr[0] * mArr[2];
    const DIVIDE = (dArr) => {
        if (dArr[0] == 0 || dArr[2] == 0) {
            return snarkResponse = SNARK[ranNum(0, 3)];
        } else {
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
    (snarkResponse) ? interResult = `` : interResult = nArr.join();
    (snarkResponse) ? opstring = snarkResponse : opstring += ` = ${nArr.join()}`;
}

BUTTONS.forEach(button => button.addEventListener('click', formulate));
document.body.addEventListener('keydown', formulate);
DISPLAY.addEventListener('click', function (e) {
    let rgb = `rgb(${ranNum(100, 255)}, ${ranNum(100, 255)}, ${ranNum(100, 255)})`
    let calc = document.getElementById('calc');
    calc.style.background = rgb;
});
