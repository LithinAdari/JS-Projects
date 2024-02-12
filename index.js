const inputSlider = document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");

const lowercaseCheck = document.querySelector("#lowercase");

const numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector(".generateBtn");

const allCheckBox = document.querySelectorAll("input[type = checkbox]");

const symbols = '`~!@#$%^&*()_+-={}:"<>?,./;[]\|'


let password = "";

let passwordLength = 10;

let checkCount = 0;

handleSlider();

// set passwordLength
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max =inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";
};

// set indicator color

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow =`0px 0px 12px 1px ${color}`;
};

//  Get a random integer
function getRandomInteger(min , max){
    return Math.floor(Math.random()*(max-min)) + min;
};

// Get a random number

function generateRandomNumber(){
    return getRandomInteger(0,9);
};

// Get a random lowerCase
function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97,123));
};

// Get a random upperCase
function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65,91));
};

// Get a random symbol fom the array of symbols
function generateSymbols() {
    let random = getRandomInteger(0 , symbols.length);
    return symbols.charAt(random);
};


// To calculate the strength of the password

function calcStrenght() {
    let hasUpper = false;

    let hasLower = false;

    let hasNumber = false;

    let hasSymbol = false;

    if(uppercaseCheck.checked) {
        hasUpper = true;
    }

    if(lowercaseCheck.checked){
        hasLower= true;
    }

    if(numbersCheck.checked){
        hasNumber = true;
    }

    if(symbolsCheck.checked){
        hasSymbol = true;
    }

    if(hasUpper && hasLower && hasNumber && hasSymbol && passwordLength >=8){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    };

};

// To copy the generated password
async  function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        // Used for copying text the AWAIT keyword is used for promising that the text has copied.
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed"
    }

    //  To make the copy Text visible

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);
}


// Get how many check Boxes are checked to generate password

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        };
    });

    // special Condition
    if(passwordLength < checkCount){
        passwordlength = checkCount;
        handleSlider();
    };
};

// To handle the count of check Box
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
});


// To handle the slider based on length of password

inputSlider.addEventListener('input' , (e) =>{
    passwordLength = e.target.value;
    // password = e.target.value;
    handleSlider();
});

// To display the copy Content on clicking on the copied button
copyBtn.addEventListener('click' , () => {
    if(passwordDisplay.value){
        copyContent();
    };
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


generateBtn.addEventListener(('click') , () => {
    // none of the checkbox are selected

    if(checkCount <= 0){
        return;
    };


    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    };

    // Get the random values of seleted check box

    password = '';
    createPassword();

});

function createPassword() {
    let funArr = [];
    password = '';

    if(uppercaseCheck.checked){
        funArr.push(generateUpperCase);
    };

    if(lowercaseCheck.checked){
        funArr.push(generateLowerCase);
    };

    if(numbersCheck.checked){
        funArr.push(generateRandomNumber);
    };

    if(symbolsCheck.checked){
        funArr.push(generateSymbols);
    };


    // Compulsory addition

    for(let i=0; i<funArr.length;i++){
        password += funArr[i]();
    }


    // Remaining Addition

    for(let i=0;i<passwordLength-funArr.length ; i++){
        let randIndex = getRandomInteger(0,funArr.length);
        password += funArr[randIndex]();
    }


    password = shuffleArray(Array.from(password));
    // Show in UI
    passwordDisplay.value = password;

    // calculate Strength

    calcStrenght();
}






