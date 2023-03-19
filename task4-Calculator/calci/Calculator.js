const allBtns = document.querySelectorAll('.btn');
const prevValue = document.querySelector('.prev-value');
const displayValue = document.querySelector('.display-values');
const numbersBtns = document.querySelectorAll('.number');
const operationalBtns = document.querySelectorAll('.operational');
const backSpace = document.getElementById('delete');
const clean = document.getElementById('clean');
const equals = document.getElementById('equals');
const darkMode = document.getElementById('dark-mode');
const spans = document.querySelectorAll('span');
const divs = document.querySelectorAll('div');
const paragraphs = document.querySelectorAll('p');

let firstNumber;
let secondNumber;
let operator;

//select the numbers

numbersBtns.forEach((numBtn) => {
    numBtn.addEventListener('click', ()=> {
        //if there's already a . in the display, do not add another one
        if((numBtn.innerText == '.') && displayValue.innerText.includes('.')) return;
        else if(displayValue.innerText.length > 9) return;
        //if there's no operator selected yet, that means that this is the first number, so I assign all the inputs to the first number
        else if(!operator){
            displayValue.innerText += numBtn.innerText;
            firstNumber = displayValue.innerText;
        }
        //if there's an operator, that means that the first number was already selected and the last number left is the second one, so all that the user types goes to the second number
        else if(operator){
            displayValue.innerText += numBtn.innerText;
            secondNumber = displayValue.innerText;
        }
    })
});

window.addEventListener('keydown', (e)=> {
    if(e.key >= 0 && e.key <= 9 && !operator || e.key == '.'){
        if((e.key == '.') && displayValue.innerText.includes('.')) return;
        else if(displayValue.innerText.length > 9) return;
        displayValue.innerText += e.key;
        firstNumber = displayValue.innerText;
    }
    else if(e.key >= 0 && e.key <= 9 && operator || e.key == '.'){
        displayValue.innerText += e.key;
        secondNumber = displayValue.innerText;
    }
    else if (e.key == '=' || e.key == 'Enter'){
        displayResult();
    }
    else if(e.key == 'Backspace'){
        displayValue.innerText = displayValue.innerText.slice(0, -1);
        firstNumber = displayValue.innerText;
    }
    else if(e.key == 'Tab'){
        e.preventDefault();
        darkBrightMode();
    }
    else if(e.key == 'c'){
        displayValue.innerText = '';
        prevValue.innerText = '';
        removeSelectedClass()
        firstNumber = undefined;
        secondNumber = undefined;
        operator = undefined;
    }
});

operationalBtns.forEach(optBtn => {
    window.addEventListener('keydown',(e) => {
        if(e.key == optBtn.innerText){
            displayResult();
            operator = e.key;
            prevValue.innerText = `${firstNumber}${operator}`
            displayValue.innerText = ''
            removeSelectedClass();
            optBtn.classList.add('selected');
        }
    });
    optBtn.addEventListener('click', () => {
        displayResult();
        operator = optBtn.innerText;
        prevValue.innerText = `${firstNumber}${operator}`
        displayValue.innerText = ''
        removeSelectedClass();
        optBtn.classList.add('selected');
    });

});

function displayResult(){
    if(firstNumber !== undefined && secondNumber !== undefined && operator !== undefined){
        displayValue.innerText = operate(Number(firstNumber), Number(secondNumber), operator);
        if(displayValue.innerText.length > 9) displayValue.innerText = displayValue.innerText.slice(0,9);
        prevValue.innerText = `${firstNumber}${operator}${secondNumber}`;
        removeSelectedClass();
        firstNumber = displayValue.innerText;
        secondNumber = undefined;
        operator = undefined;
    }
    return;
}

function operate (number1, number2, operator) {
if(operator == '+'){
    return number1 + number2;
}
else if (operator == '-'){
    return number1 - number2;
}
else if (operator == '*'){
    return number1 * number2;
}
else if (operator == '/'){
    if (number2 == '0') return '🤡Bruh🤡' 
    return number1 / number2;
}
}

//Darkmode function and event listener

darkBrightMode();

function darkBrightMode(){
    spans.forEach(span => {
        span.classList.toggle('bright-mode');
    })
    divs.forEach(div => {
        div.classList.toggle('bright-mode');
    })
    paragraphs.forEach(p => {
        p.classList.toggle('bright-mode');
    })
    document.body.classList.toggle('bright-mode');
}

darkMode.addEventListener('click', ()=> {
    spans.forEach(span => {
        span.classList.toggle('bright-mode');
    })
    divs.forEach(div => {
        div.classList.toggle('bright-mode');
    })
    paragraphs.forEach(p => {
        p.classList.toggle('bright-mode');
    })
    document.body.classList.toggle('bright-mode');
});

// function to clean de display and values of the calculator

clearCalc();

function clearCalc(){
    clean.addEventListener('click', ()=> {
        displayValue.innerText = '';
        prevValue.innerText = '';
        removeSelectedClass()
        firstNumber = undefined;
        secondNumber = undefined;
        operator = undefined;
    });
}

//function to delete the last digit the user entered

deleteBackspace();

function deleteBackspace(){
    backSpace.addEventListener('click', () => {
        displayValue.innerText = displayValue.innerText.slice(0, -1);
        firstNumber = displayValue.innerText;
    });
}

function removeSelectedClass(){
    operationalBtns.forEach(optBtn => (
        optBtn.classList.remove('selected')
    ));
}

equals.addEventListener('click', () => {
    displayResult();
})

