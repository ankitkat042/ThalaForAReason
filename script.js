const tabs = document.querySelectorAll('.tab');
const tabContentContainers = document.querySelectorAll(".tabContent")
const resultBox = document.querySelectorAll(".result-box")[0]
const explanationContainer = document.querySelector('.explaination-container');
const targetProduct = 7;


// TAB HANDLER
tabs.forEach(tab => { tab.addEventListener("click", handleTabClick) });
function handleTabClick(event) {
    // Remove all active tabs and tab-content
    tabs.forEach(tab => { tab.classList.remove('active') });
    tabContentContainers.forEach(item => { item.classList.remove('active') });

    // Add active class on selected tabs and tab-content
    event.target.classList.add('active');
    const selectedTabContainer = document.getElementById(event.target.getAttribute('data-tab'));
    selectedTabContainer.classList.add("active");

    // Clear the explanation container
    clearExplanationContainer();
}

// =========================================================================
// FUNCTION TO CONVERT ANY LENGTH OF INPUTED NUMBERS TO SUM UP TO 7
// =========================================================================
// Function to clear the explanation container
function clearExplanationContainer() {
    explanationContainer.innerHTML = '';
}

// Add paragraph to the explanation container
async function addPara(text) {
    const p = await document.createElement("p");
    p.innerText = text;
    await explanationContainer.appendChild(p);
}

// Handle Output at the end
function handleResultOutput() {
    resultBox.classList.remove("hidden")
    // // Play the success sound
    // var sound = document.getElementById('success-sound');
    // sound.play();
    setTimeout(() => {
        resultBox.classList.add("hidden")
    }, 5000);
}


// conditions
async function meetInputConditions(numbers) {
    if (numbers.length === 0) {
        const msg = await 'Please enter at least one number.';
        await alert(msg);
        return await false;
    } else if (numbers.some(item => isNaN(item))) {
        await alert('Please enter numbers only.');
        return await false;
    }
    return await true;
};

// get total of all numbers
async function sumNumbers(arr) {
    return await arr.reduce((a, b) => a + b, 0);
}

// handle number if it is less than 7
async function handleLessThanSeven(num) {
    const multiplier = await targetProduct / num;
    await addPara(`If we multiply ${num} by ${multiplier.toFixed(2)}, \n the result we get is 7.`);
    await handleResultOutput();
    return await num * multiplier;
}

// handle number if it is greater than 7
async function handleGreaterThanSeven(num) {
    const divisor = await num / 7;
    await addPara(`If we divide ${num} by ${divisor.toFixed(2)}, \n the result we get is 7.`);
    await handleResultOutput();
    return await num / divisor;
}


const getNumSeven = async (num) => {
    if (num < 7) {
        return await handleLessThanSeven(num);
    } else if (num > 7) {
        return await handleGreaterThanSeven(num);
    } else {
        return await handleResultOutput();
    }
}

// HANDELING USER INPUT MUTATION TO GET NUMBER SEVEN
async function mutateUserInput(numbers, tabId) {
    clearExplanationContainer();

    // Check if the array meets input conditions
    if (!await meetInputConditions(numbers)) { return; }

    // get total value of all the numbers
    const sumNum = await sumNumbers(numbers);
    if (sumNum !== targetProduct) {
        addPara(`On adding all the numbers, we get ${sumNum}.`);
    }
    await getNumSeven(sumNum);
}




// FUNCTIONS TO GET THE NUMBER SEVEN
function checkOneDigit() {
    const inputOne = document.getElementById('one-digit-i1').value;
    mutateUserInput([parseInt(inputOne, 10)], 'oneDigit');
}

function checkTwoDigits() {
    const inputOne = document.getElementById('two-digit-i1').value;
    const inputTwo = document.getElementById('two-digit-i2').value;
    mutateUserInput([parseInt(inputOne, 10), parseInt(inputTwo, 10)], 'twoDigits');
}

function checkThreeDigits() {
    const inputOne = document.getElementById('three-digit-i1').value;
    const inputTwo = document.getElementById('three-digit-i2').value;
    const inputThree = document.getElementById('three-digit-i3').value;
    mutateUserInput([parseInt(inputOne, 10), parseInt(inputTwo, 10), parseInt(inputThree, 10)], 'threeDigits');
}