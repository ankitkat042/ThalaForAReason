// Function to show a tab
function showTab(tabName) {
    // Hide all tab content
    var tabcontent = document.getElementsByClassName("tabContent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Remove 'active' class from all tabs
    var tablinks = document.getElementsByClassName("tab");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName + "Tab").className += " active";
}

// Function to check if the number(s) sum to 7
function checkDigits(digits, tabName) {
    var sum = digits.reduce(function(a, b) { return parseInt(a) + parseInt(b); }, 0);
    
    if (sum === 7) {
        showCongratulations(tabName);
    } else {
        showAlert('Try again!', tabName);
    }
}

// Function to show congratulations message
function showCongratulations(tabName) {
    var tab = document.getElementById(tabName);
    tab.innerHTML = '<div class="animate__animated animate__zoomIn">' +
                    'You Guessed It Correct!<br>' +
                    'Thala for a reason❤' +
                    '</div>';
    
    // Play the success sound
    var sound = document.getElementById('success-sound');
    sound.play();

    setTimeout(function() {
        tab.innerHTML = '';
        // Reset tab content after animation
        setupTabContent(tabName);
    }, 5000); // Display the message for 5 seconds
}

// Function to show alert message
function showAlert(message, tabName) {
    var tab = document.getElementById(tabName);
    tab.innerHTML = '<div class="animate__animated animate__shakeX">' +
                    message +
                    '</div>';
    setTimeout(function() {
        tab.innerHTML = '';
        // Reset tab content after animation
        setupTabContent(tabName);
    }, 1500); // Display the alert for 3 seconds
}

// Setup tab content after the congratulations or alert message
function setupTabContent(tabName) {
    if (tabName === 'oneDigit') {
        document.getElementById(tabName).innerHTML = '<input type="text" id="singleDigit" placeholder="Type the Lucky number">' +
                                                      '<button onclick="checkOneDigit()">Submit</button>';
    } else if (tabName === 'twoDigits') {
        document.getElementById(tabName).innerHTML = '<input type="text" id="firstDigit" placeholder="First number">' +
                                                      '<input type="text" id="secondDigit" placeholder="Second number">' +
                                                      '<button onclick="checkTwoDigits()">Submit</button>';
    } else if (tabName === 'threeDigits') {
        document.getElementById(tabName).innerHTML = '<input type="text" id="digitOne" placeholder="First number">' +
                                                      '<input type="text" id="digitTwo" placeholder="Second number">' +
                                                      '<input type="text" id="digitThree" placeholder="Third number">' +
                                                      '<button onclick="checkThreeDigits()">Submit</button>';
    }
}

// Event listeners for the submit buttons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('oneDigitTab').addEventListener('click', function() {
        showTab('oneDigit');
    });
    document.getElementById('twoDigitsTab').addEventListener('click', function() {
        showTab('twoDigits');
    });
    document.getElementById('threeDigitsTab').addEventListener('click', function() {
        showTab('threeDigits');
    });

    setupTabContent('oneDigit');
    setupTabContent('twoDigits');
    setupTabContent('threeDigits');
});

// Functions to check digits on submit
function checkOneDigit() {
    var digit = document.getElementById('singleDigit').value;
    checkDigits([digit], 'oneDigit');
}

function checkTwoDigits() {
    var firstDigit = document.getElementById('firstDigit').value;
    var secondDigit = document.getElementById('secondDigit').value;
    checkDigits([firstDigit, secondDigit], 'twoDigits');
}

function checkThreeDigits() {
    var digitOne = document.getElementById('digitOne').value;
    var digitTwo = document.getElementById('digitTwo').value;
    var digitThree = document.getElementById('digitThree').value;
    checkDigits([digitOne, digitTwo, digitThree], 'threeDigits');
}
