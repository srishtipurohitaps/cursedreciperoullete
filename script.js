let cursednessLevel = 0;
let recipeCount = 0;
let unlockedAchievements = new Set();
const cursedIngredients = [
    'Takis', 'Cold Brew Coffee', 'Toothpaste', 'Energy Drinks', 'Instant Ramen',
    'Pickle Juice', 'Hot Sauce', 'Cereal', 'Bubble Tea Pearls', 'Protein Powder',
    'Ranch Dressing', 'Sriracha', 'Pop Rocks', 'Gummy Bears', 'Cotton Candy',
    'Wasabi', 'Spam', 'Monster Energy', 'Flamin\' Hot Cheetos', 'Marshmallows',
    'Sour Patch Kids', 'Energy Powder', 'Instant Coffee', 'Chocolate Syrup',
    'Mentos', 'Expired Milk', 'Food Coloring', 'Glitter (Edible)'
];
const cookingMethods = [
    'Microwave until it screams', 'Blend in chaos mode', 'Mix with existential dread',
    'Heat until reality breaks', 'Freeze in the void of despair', 'Shake with the fury of 1000 suns',
    'Stir counterclockwise while crying', 'Bake in the fires of regret', 'Steam with tears of joy',
    'Grill on the flames of madness'
];
const measurements = [
    '3.14 handfuls', 'Until it glows', '7 dimension minutes', 'A sprinkle of chaos',
    'Two cups of regret', 'One tablespoon of fear', 'Half a universe',
    'Exactly π teaspoons', 'Until the angels weep', 'A pinch of the void'
];
const achievements = [
    { name: 'Doom Chef', description: 'Generated your first cursed recipe', icon: '🔥', requirement: 'first_recipe' },
    { name: 'Apocalypse Gordon Ramsay', description: 'Uploaded proof of cooking', icon: '👨‍🍳', requirement: 'upload_photo' },
    { name: 'Last Meal Maker', description: 'Generated 5 cursed recipes', icon: '💀', requirement: '5_recipes' },
    { name: 'Chaos Kitchen Master', description: 'Generated 10 cursed recipes', icon: '⚡', requirement: '10_recipes' },
    { name: 'Glitch Hunter', description: 'Found a 404 ingredient', icon: '🚫', requirement: 'glitch_found' },
    { name: 'Recipe Survivor', description: 'Generated 20 cursed recipes', icon: '🏆', requirement: '20_recipes' }
];
const glitchMessages = [
    '404 INGREDIENT NOT FOUND',
    'RECIPE DIMENSION COLLAPSED',
    'INGREDIENT CORRUPTED BY REALITY',
    'CONNECTION TO FOOD MATRIX LOST',
    'RECIPE.EXE HAS STOPPED WORKING'
];
function init() {
    createParticles();
    initializeAchievements();
    setupEventListeners();
}
function createParticles() {
    const particleContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particleContainer.appendChild(particle);
    }
}
function initializeAchievements() {
    const achievementsGrid = document.getElementById('achievements-grid');
    achievements.forEach(achievement => {
        const achievementDiv = document.createElement('div');
        achievementDiv.className = 'achievement';
        achievementDiv.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
        `;
        achievementsGrid.appendChild(achievementDiv);
    });
}
function setupEventListeners() {
    document.getElementById('generate-btn').addEventListener('click', generateRecipe);
    document.getElementById('photo-input').addEventListener('change', handlePhotoUpload);
}
function generateRecipe() {
    const button = document.getElementById('generate-btn');
    const spinner = document.getElementById('loading-spinner');
    const wheel = document.getElementById('roulette-wheel');
    button.disabled = true;
    spinner.style.display = 'block';
    wheel.classList.add('spinning');
    document.body.classList.add('shake');
    setTimeout(() => {
        recipeCount++;
        cursednessLevel = Math.min(20, recipeCount);
        const shouldGlitch = Math.random() < 0.15;
        if (shouldGlitch) {
            triggerGlitch();
            return;
        }
        displayRecipe();
        updateCursednessLevel();
        checkAchievements();
        spinner.style.display = 'none';
        button.disabled = false;
        wheel.classList.remove('spinning');
        document.body.classList.remove('shake');
        const btnText = document.getElementById('btn-text');
        if (recipeCount === 1) {
            btnText.textContent = 'GENERATE MORE CHAOS';
        } else if (recipeCount >= 10) {
            btnText.textContent = 'EMBRACE THE VOID';
        } else if (recipeCount >= 5) {
            btnText.textContent = 'SUMMON DARKNESS';
        }
    }, 2000);
}
function displayRecipe() {
    const numIngredients = Math.min(3 + Math.floor(cursednessLevel / 3), 8);
    const selectedIngredients = getRandomElements(cursedIngredients, numIngredients);
    const selectedMethods = getRandomElements(cookingMethods, Math.min(numIngredients, 5));
    const selectedMeasurements = getRandomElements(measurements, numIngredients);
    const recipeName = generateRecipeName(selectedIngredients);
    document.getElementById('recipe-title').textContent = recipeName;
    const ingredientList = document.getElementById('ingredient-list');
    ingredientList.innerHTML = '';
    selectedIngredients.forEach((ingredient, index) => {
        const li = document.createElement('li');
        li.textContent = `${selectedMeasurements[index]} of ${ingredient}`;
        ingredientList.appendChild(li);
    });
    const instructionList = document.getElementById('instruction-list');
    instructionList.innerHTML = '';
    selectedMethods.forEach(method => {
        const li = document.createElement('li');
        li.textContent = method;
        instructionList.appendChild(li);
    });
    const finalInstruction = document.createElement('li');
    finalInstruction.textContent = cursednessLevel > 10 ? 
        'Consume while questioning your life choices and embrace the chaos within' :
        'Serve immediately before you change your mind';
    instructionList.appendChild(finalInstruction);
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.classList.add('show');
    recipeContainer.scrollIntoView({ behavior: 'smooth' });
}
function generateRecipeName(ingredients) {
    const prefixes = ['Apocalyptic', 'Cursed', 'Toxic', 'Chaotic', 'Demonic', 'Twisted', 'Forbidden', 'Unholy'];
    const suffixes = ['Nightmare', 'Chaos', 'Doom', 'Madness', 'Terror', 'Catastrophe', 'Abomination', 'Disaster'];
    const mainIngredient = ingredients[0];
    const secondIngredient = ingredients[1] || ingredients[0];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix} ${mainIngredient} &amp; ${secondIngredient} ${suffix}`;
}
function triggerGlitch() {
    const glitchOverlay = document.getElementById('glitch-overlay');
    const errorMessage = document.getElementById('error-message');
    const recipeContainer = document.getElementById('recipe-container');
    const spinner = document.getElementById('loading-spinner');
    const button = document.getElementById('generate-btn');
    const wheel = document.getElementById('roulette-wheel');
    glitchOverlay.style.display = 'block';
    document.body.classList.add('glitch');
    const randomGlitch = glitchMessages[Math.floor(Math.random() * glitchMessages.length)];
    errorMessage.textContent = randomGlitch;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        glitchOverlay.style.display = 'none';
        errorMessage.style.display = 'none';
        document.body.classList.remove('glitch');
        displayCorruptedRecipe();
        unlockAchievement('glitch_found');
        spinner.style.display = 'none';
        button.disabled = false;
        wheel.classList.remove('spinning');
        document.body.classList.remove('shake');
    }, 1000);
}
function displayCorruptedRecipe() {
    const recipeName = 'RECIPE CORRUPTED BY VOID';
    document.getElementById('recipe-title').textContent = recipeName;
    const ingredientList = document.getElementById('ingredient-list');
    ingredientList.innerHTML = '';
    const corruptedIngredients = [
        '<span class="corrupted-text">Tak̴̲͊i̷s̸̾</span>',
        '<span class="lorem-ipsum">Lorem ipsum dolor sit</span>',
        '<span class="corrupted-text">T̷o̴o̸t̷h̶p̵a̶s̸t̵e̷</span>',
        '<span class="lorem-ipsum">Consectetur adipiscing</span>'
    ];
    corruptedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.innerHTML = `ERROR: ${ingredient}`;
        ingredientList.appendChild(li);
    });
    const instructionList = document.getElementById('instruction-list');
    instructionList.innerHTML = '';
    const corruptedInstructions = [
        'M̷i̶x̷ ̸u̶n̸t̸i̵l̷ ̴r̷e̴a̶l̷i̵t̸y̶ ̵b̸r̶e̶a̶k̷s̸',
        'Lorem ipsum dolor sit amet',
        'C̶o̵n̴s̶u̶m̵e̸ ̵w̸h̸i̶l̶e̴ ̷ERROR ERROR ERROR',
        'Sed do eiusmod tempor incididunt'
    ];
    corruptedInstructions.forEach(instruction => {
        const li = document.createElement('li');
        li.innerHTML = instruction;
        instructionList.appendChild(li);
    });
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.classList.add('show');
    recipeContainer.scrollIntoView({ behavior: 'smooth' });
}
function updateCursednessLevel() {
    document.getElementById('cursedness-level').textContent = cursednessLevel;
    const fillPercent = (cursednessLevel / 20) * 100;
    document.getElementById('cursedness-fill').style.width = fillPercent + '%';
}
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const uploadStatus = document.getElementById('upload-status');
        uploadStatus.innerHTML = `
            <div style="color: var(--color-neon-green); margin-top: 16px; font-weight: bold;">
                🔥 CHAOS PROOF UPLOADED! 🔥<br>
                File: ${file.name}
            </div>
        `;
        unlockAchievement('upload_photo');
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }
}
function checkAchievements() {
    if (recipeCount === 1) {
        unlockAchievement('first_recipe');
    } else if (recipeCount === 5) {
        unlockAchievement('5_recipes');
    } else if (recipeCount === 10) {
        unlockAchievement('10_recipes');
    } else if (recipeCount === 20) {
        unlockAchievement('20_recipes');
    }
}
function unlockAchievement(requirement) {
    const achievement = achievements.find(a => a.requirement === requirement);
    if (achievement && !unlockedAchievements.has(achievement.name)) {
        unlockedAchievements.add(achievement.name);
        showAchievementPopup(achievement);
        updateAchievementDisplay(achievement);
    }
}
function showAchievementPopup(achievement) {
    document.getElementById('popup-icon').textContent = achievement.icon;
    document.getElementById('popup-name').textContent = achievement.name;
    document.getElementById('popup-desc').textContent = achievement.description;
    const popup = document.getElementById('achievement-popup');
    popup.style.display = 'block';
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);
}
function updateAchievementDisplay(achievement) {
    const achievementElements = document.querySelectorAll('.achievement');
    const index = achievements.indexOf(achievement);
    if (index !== -1 && achievementElements[index]) {
        achievementElements[index].classList.add('unlocked');
    }
}
function closeAchievementPopup() {
    document.getElementById('achievement-popup').style.display = 'none';
}
function getRandomElements(array, count) {
    const shuffled = array.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
document.addEventListener('DOMContentLoaded', init);
setInterval(() => {
    if (Math.random() < 0.1) {
        document.body.classList.add('glitch');
        setTimeout(() => {
            document.body.classList.remove('glitch');
        }, 200);
    }
}, 10000);