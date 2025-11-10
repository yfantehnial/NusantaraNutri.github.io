// --- 1. Tab Switching Logic ---
function openTab(evt, tabName) {
    let i, tabcontent, tabbuttons;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the 'active' class from all buttons
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// --- 2. Advanced Calorie Calculator Logic (TDEE + Goal) ---
function calculateCalories() {
    // Get user input values
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const activityMultiplier = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value; 
    const resultElement = document.getElementById('result');

    // Input validation
    if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
        resultElement.textContent = "INPUT ERROR: Enter valid positive numbers.";
        return;
    }

    let bmr;

    // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else { // female
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Calculate Total Daily Energy Expenditure (TDEE)
    let tdee = bmr * activityMultiplier;

    // Apply Goal Adjustment Factor
    let adjustment = 0;
    if (goal === 'lose') {
        adjustment = -500; // Calorie deficit for weight loss
    } else if (goal === 'gain') {
        adjustment = 300;  // Calorie surplus for weight gain
    }
    
    const finalTarget = tdee + adjustment;

    // Display the result
    resultElement.textContent = Math.round(finalTarget).toLocaleString();
}


// --- 3. Brunei Food List Data and Population ---
const bruneiFoods = [
    // Core Dishes
    { name: "Nasi Katok (Standard)", serving: "1 Packet", calories: 400 },
    { name: "Ambuyat with Calamari", serving: "Standard Bowl", calories: 350 },
    { name: "Mee Goreng (Basic)", serving: "Plate", calories: 550 },
    { name: "Kolo Mee (Dry/Small)", serving: "Bowl", calories: 420 },
    { name: "Nasi Lemak (Ayam Goreng)", serving: "Standard Dish", calories: 650 },
    { name: "Soto (Chicken Noodle Soup)", serving: "Large Bowl", calories: 380 },
    { name: "Nasi Ayam (Chicken Rice)", serving: "Standard Plate", calories: 600 },
    { name: "Roti Prata/Canai (2 Pcs)", serving: "2 Pieces", calories: 320 },
    { name: "Kelupis (Glutinous Rice)", serving: "1 Piece", calories: 120 },
    // Snacks & Kuih Muih
    { name: "Kek Lapis (Average Slice)", serving: "1 Slice (70g)", calories: 280 },
    { name: "Penyaram (Kuih)", serving: "1 Piece", calories: 200 },
    { name: "Cucur Pisang (Fried Banana)", serving: "3 Pieces", calories: 250 },
    // Drinks (Commonly High Calorie)
    { name: "Teh Tarik (Sweet)", serving: "1 Mug", calories: 180 },
    { name: "Milo Ais (Sweet)", serving: "1 Glass", calories: 250 },
    { name: "Kopi Susu (Sweet)", serving: "1 Glass", calories: 160 }
];

function populateFoodList() {
    const tableBody = document.querySelector('#food-table tbody');
    tableBody.innerHTML = '';
    
    bruneiFoods.forEach(food => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = food.name;
        row.insertCell().textContent = food.serving;
        row.insertCell().textContent = food.calories.toLocaleString();
    });
}

// Initial setup on page load
document.addEventListener("DOMContentLoaded", () => {
    // Manually trigger the 'NewsFeed' tab to be active
    document.getElementById("NewsFeed").style.display = "block";
    document.getElementsByClassName("tab-button")[0].className += " active";
    populateFoodList();
});
