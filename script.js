// --- 1. Tab Switching Logic ---
function openTab(evt, tabName) {
    // Declare all variables
    let i, tabcontent, tabbuttons;

    // Get all elements with class="tab-content" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tab-button" and remove the class "active"
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Ensure the default tab is active on load
document.addEventListener("DOMContentLoaded", () => {
    // Manually trigger the 'Dashboard' tab
    document.getElementById("Dashboard").style.display = "block";
    document.getElementsByClassName("tab-button")[0].className += " active";
    populateFoodList(); // Call the function to fill the table on load
});


// --- 2. Calorie Calculator Logic (TDEE) ---
function calculateCalories() {
    // Get user input values
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const activityMultiplier = parseFloat(document.getElementById('activity').value);
    const resultElement = document.getElementById('result');

    // Input validation
    if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
        resultElement.textContent = "Error: Enter valid numbers.";
        return;
    }

    let bmr;

    // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    if (gender === 'male') {
        // BMR Men: (10 * weight) + (6.25 * height) - (5 * age) + 5
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else { // female
        // BMR Women: (10 * weight) + (6.25 * height) - (5 * age) - 161
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Calculate Total Daily Energy Expenditure (TDEE)
    // TDEE = BMR * Activity Multiplier
    const tdee = bmr * activityMultiplier;

    // Display the result, rounded to the nearest whole number
    resultElement.textContent = Math.round(tdee).toLocaleString();
}


// --- 3. Brunei Food List Population ---
const bruneiFoods = [
    { name: "Nasi Katok", serving: "Small Packet", calories: 350 },
    { name: "Ambuyat", serving: "Per bowl", calories: 150 },
    { name: "Nasi Lemak", serving: "Standard Dish", calories: 550 },
    { name: "Kolo Mee", serving: "Standard Bowl", calories: 420 },
    { name: "Mee Goreng", serving: "Plate", calories: 480 },
    { name: "Penyaram (Kuih)", serving: "1 Piece", calories: 200 },
    { name: "Ayam Penyet", serving: "Standard Plate", calories: 600 },
    { name: "Bandung (Drink)", serving: "1 Glass", calories: 180 }
];

function populateFoodList() {
    const tableBody = document.querySelector('#food-table tbody');
    
    bruneiFoods.forEach(food => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = food.name;
        row.insertCell().textContent = food.serving;
        row.insertCell().textContent = food.calories.toLocaleString();
    });
}
