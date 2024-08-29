// Retrieve the selected character from local storage
let selectedCharacter = localStorage.getItem('selectedCharacterName');
let gameBoard = document.getElementById('game-board');
let selectedCharacterName = null;

// Character stats
let currentHP;
let maxHP;
let Armr;
let Hpe;
let Spd;
let Rnge;
let Atk;
let Apm;

// Movement variables
let characterElement;
const gravityStrength = 1; // Speed of gravity
let characterPosition = { x: 0, y: 0 };
let movementDirection = null;
let lastUpdateTime = 0;
let isJumping = false;
let jumpStartY = 0;
let jumpVelocity = 0;
let jumpStrength = 16;

// Attack variables
let isAttacking = false;
let mouseX, mouseY;
let lastAttackTime = 0;
let projectiles = [];  // If basic attack is a projectile
const projectileSpeed = 10; // Speed of projectile
const gravity = .1;

// Update the mouse position on mouse move
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - gameBoard.getBoundingClientRect().left;
    mouseY = event.clientY - gameBoard.getBoundingClientRect().top;
});

// Add map interactivity to the map, e.g., changing terrain or adding objects for the player
document.querySelectorAll('.map-cell').forEach(cell => {
    cell.addEventListener('click', () => {
        cell.style.backgroundColor = '#4682b4'; // Example: Change to blue for water
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const mapCells = document.querySelectorAll('.map-cell');
    if (mapCells.length > 0) {
        mapCells[0].classList.add('visible'); // Make the first cell visible
    }
});

function initializeMap() {
    // Define the size of the map
    const numRows = 5;
    const numCols = 5;
    
    // Create cells in the grid
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('map-cell');
            gameBoard.appendChild(cell);
        }
    }

    // Create the character element
    characterElement = document.createElement('div');
    characterElement.classList.add('player-character');
    characterElement.textContent = selectedCharacter; // Display the name or use an image
    characterElement.style.position = 'absolute'; // Ensure position is absolute

    // Place the character in the first cell
    const wallGate = document.querySelector('.wall-gate');
    if (wallGate) {
        wallGate.appendChild(characterElement);
    } else {
        console.error('Wall gate not found!');
    }

    // Initialize character position
    characterPosition.x = characterElement.offsetLeft;
    characterPosition.y = characterElement.offsetTop;

    // Start the movement animation loop
    requestAnimationFrame(updateMovement);
    applyGravity(characterElement);
}

// Function for gravity (for characterElement currently)
function applyGravity(characterElement) {
    let isGrounded = true;
    let position = 0; // Initial position of the character

    const gravityInterval = setInterval(() => {
        if (position < 700 && isGrounded === false) { // Assuming 700px is the cell height
            position += gravityStrength;
            characterElement.style.top = `${position}px`;
        } else {
            clearInterval(gravityInterval); // Stop the gravity effect once the character lands
        }
    }, 10); // Adjust the interval to make the gravity effect smooth
}

// Function to move the character
function moveCharacter() {
    if (movementDirection) {
        const speed = Spd; // Adjust the speed factor for smoother movement
        if (movementDirection === 'left') {
            characterPosition.x -= speed;
        } else if (movementDirection === 'right') {
            characterPosition.x += speed;
        }
        characterElement.style.left = `${characterPosition.x}px`;
    }
}

// Function to handle jumping
function handleJump() {
    if (isJumping) {
        // Update the vertical position of the character
        jumpVelocity -= gravityStrength; // Apply gravity
        characterPosition.y -= jumpVelocity;
        characterElement.style.top = `${characterPosition.y}px`;

        // Check if the character has landed
        if (characterPosition.y >= jumpStartY) {
            characterPosition.y = jumpStartY;
            characterElement.style.top = `${characterPosition.y}px`;
            isJumping = false;
            jumpVelocity = 0;
        }
    }
}

// Function to handle basic attack
function handleAttack() {
    if (isAttacking) {
        const now = Date.now();
        const attackInterval = 60000 / Apm; // Calculate attack interval based on Apm

        if (now - lastAttackTime >= attackInterval) {
            // Perform attack logic here
            console.log(`Attack! Damage: ${Atk}, Range: ${Rnge}`);

            // Update the last attack time
            lastAttackTime = now;
        }
    }
}

// Function to handle movement animation
function updateMovement(timestamp) {
    if (lastUpdateTime === 0) lastUpdateTime = timestamp;
    const deltaTime = timestamp - lastUpdateTime;
    lastUpdateTime = timestamp;

    if (movementDirection) {
        moveCharacter();
    }
    
    handleJump(); // Handle jumping logic
    handleAttack(); // Handle attacking logic
    requestAnimationFrame(updateMovement);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'a' || event.key === 'A') {
        movementDirection = 'left';
    } else if (event.key === 'd' || event.key === 'D') {
        movementDirection = 'right';
    } else if (event.key === 'w' || event.key === 'W') {
        if (!isJumping) {
            isJumping = true;
            jumpVelocity = jumpStrength; // Set the initial jump velocity
            jumpStartY = characterPosition.y; // Set the starting position for the jump
        }
    } else if (event.key === ' ') {
        event.preventDefault(); // Prevent default action for the spacebar (scrolling)
        if (!isAttacking) {
            isAttacking = true;
            launchProjectile(mouseX, mouseY);
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a' || event.key === 'A' || event.key === 'd' || event.key === 'D') {
        movementDirection = null;
    } else if (event.key === ' ') {
        isAttacking = false;
    }
});

// Function to update the game state
function updateGame() {
    updateProjectiles();
    requestAnimationFrame(updateGame);
}

// Start the game loop
updateGame();

// Call the function to initialize the map
initializeMap();

// Function to create and launch a projectile
function launchProjectile(mouseX, mouseY) {
    const projectileElement = document.createElement('div');
    projectileElement.classList.add('projectile');
    gameBoard.appendChild(projectileElement);

    // Get the position of the wallGate element
    const wallGate = document.querySelector('.wall-gate');
    const wallGateRect = wallGate.getBoundingClientRect();

    // Calculate the offset of the wallGate relative to the game board
    const wallGateOffsetX = wallGateRect.left;
    const wallGateOffsetY = wallGateRect.top;

    // Set initial position of the projectile
    let projectilePosition = {
        x: characterPosition.x + wallGateOffsetX,
        y: characterPosition.y + wallGateOffsetY,
    };

    // Calculate the direction of the projectile
    const angle = Math.atan2(mouseY - projectilePosition.y, mouseX - projectilePosition.x);
    let velocity = {
        x: projectileSpeed * Math.cos(angle),
        y: projectileSpeed * Math.sin(angle)
    };

    // Store projectile data
    projectiles.push({
        element: projectileElement,
        position: projectilePosition,
        velocity: velocity,
        launchTime: Date.now()
    });

      // Position the projectile element
    projectileElement.style.left = `${projectilePosition.x}px`;
    projectileElement.style.top = `${projectilePosition.y}px`;
}

// Function to update projectile positions
function updateProjectiles() {
    const now = Date.now(); // Get current time
    projectiles.forEach((proj, index) => {
        // Apply gravity
        proj.velocity.y += gravity;
        proj.position.x += proj.velocity.x;
        proj.position.y += proj.velocity.y;

        // Update projectile position
        proj.element.style.left = `${proj.position.x}px`;
        proj.element.style.top = `${proj.position.y}px`;

        // Check if 3 seconds have passed since launch
        if (now - proj.launchTime > 3000) {
            proj.element.remove();
            projectiles.splice(index, 1);
        }
    });
}

// Update the header with the selected character's name
if (selectedCharacter === "Archer") {
    // Characters and their stats for hud and display

    Armr = 1;
    Hpe = 2;
    Spd = 5;
    Rnge = 150;
    Atk = 2;
    Apm = 160;

    currentHP = 75;
    maxHP = 75;

    skl1 = "Multi-shot";
    skl2 = "Arrow rain";
    skl3 = "Feather mark";
    skl4 = "Eagle eye";

    isSkl1Learned = false;
    isSkl2Learned = false;
    isSkl3Learned = false;
    isSkl4Learned = false;

    document.querySelector('h1.selectedCharacterName').textContent = `Archer's HUD`;
    // Update the individual stats in the HUD
    document.querySelector('.box:nth-child(1) h3').textContent = `Armr: ${Armr}`;
    document.querySelector('.box:nth-child(2) h3').textContent = `Hpe: ${Hpe}`;
    document.querySelector('.box:nth-child(3) h3').textContent = `Spd: ${Spd}`;
    document.querySelector('.box:nth-child(4) h3').textContent = `Rnge: ${Rnge}`;
    document.querySelector('.box:nth-child(5) h3').textContent = `Atk: ${Atk}`;
    document.querySelector('.box:nth-child(6) h3').textContent = `Apm: ${Apm}`;
} else if (selectedCharacter === "Musketeer") {

    Armr = 2;
    Hpe = 2;
    Spd = 3;
    Rnge = 200;
    Atk = 5;
    Apm = 70;

    currentHP = 100;
    maxHP = 100;

    skl1 = "Rapier thrash";
    skl2 = "Rapid fire";
    skl3 = "Piercing shot";
    skl4 = "Bounce shot";

    isSkl1Learned = false;
    isSkl2Learned = false;
    isSkl3Learned = false;
    isSkl4Learned = false;


    document.querySelector('h1.selectedCharacterName').textContent = `Musketeer's HUD`;
    // Update the individual stats in the HUD
    document.querySelector('.box:nth-child(1) h3').textContent = `Armr: ${Armr}`;

    document.querySelector('.box:nth-child(2) h3').textContent = `Hpe: ${Hpe}`;

    document.querySelector('.box:nth-child(3) h3').textContent = `Spd: ${Spd}`;

    document.querySelector('.box:nth-child(4) h3').textContent = `Rnge: ${Rnge}`;

    document.querySelector('.box:nth-child(5) h3').textContent = `Atk: ${Atk}`;

    document.querySelector('.box:nth-child(6) h3').textContent = `Apm: ${Apm}`;

} else if (selectedCharacter === "Monk") {

    Armr = 2;
    Hpe = 4;
    Spd = 6;
    Rnge = 20;
    Atk = 1;
    Apm = 240;

    currentHP = 120;
    maxHP = 120;

    skl1 = "Rapier thrash";
    skl2 = "Rapid fire";
    skl3 = "Piercing shot";
    skl4 = "Bounce shot";

    isSkl1Learned = false;
    isSkl2Learned = false;
    isSkl3Learned = false;
    isSkl4Learned = false;


    document.querySelector('h1.selectedCharacterName').textContent = `Musketeer's HUD`;
    // Update the individual stats in the HUD
    document.querySelector('.box:nth-child(1) h3').textContent = `Armr: ${Armr}`;

    document.querySelector('.box:nth-child(2) h3').textContent = `Hpe: ${Hpe}`;

    document.querySelector('.box:nth-child(3) h3').textContent = `Spd: ${Spd}`;

    document.querySelector('.box:nth-child(4) h3').textContent = `Rnge: ${Rnge}`;

    document.querySelector('.box:nth-child(5) h3').textContent = `Atk: ${Atk}`;

    document.querySelector('.box:nth-child(6) h3').textContent = `Apm: ${Apm}`; 
    
} else if (selectedCharacter === "Ninja") {

    Armr = 2;
    Hpe = 1;
    Spd = 5;
    Rnge = 40;
    Atk = 3;
    Apm = 120;

    currentHP = 90;
    maxHP = 90;

    skl1 = "Rapier thrash";
    skl2 = "Rapid fire";
    skl3 = "Piercing shot";
    skl4 = "Bounce shot";

    isSkl1Learned = false;
    isSkl2Learned = false;
    isSkl3Learned = false;
    isSkl4Learned = false;


    document.querySelector('h1.selectedCharacterName').textContent = `Musketeer's HUD`;
    // Update the individual stats in the HUD
    document.querySelector('.box:nth-child(1) h3').textContent = `Armr: ${Armr}`;

    document.querySelector('.box:nth-child(2) h3').textContent = `Hpe: ${Hpe}`;

    document.querySelector('.box:nth-child(3) h3').textContent = `Spd: ${Spd}`;

    document.querySelector('.box:nth-child(4) h3').textContent = `Rnge: ${Rnge}`;

    document.querySelector('.box:nth-child(5) h3').textContent = `Atk: ${Atk}`;

    document.querySelector('.box:nth-child(6) h3').textContent = `Apm: ${Apm}`; 
    
} else if (selectedCharacter === "Bruiser") {

    Armr = 3;
    Hpe = 6;
    Spd = 3;
    Rnge = 35;
    Atk = 6;
    Apm = 60;

    currentHP = 200;
    maxHP = 100;

    skl1 = "Rapier thrash";
    skl2 = "Rapid fire";
    skl3 = "Piercing shot";
    skl4 = "Bounce shot";

    isSkl1Learned = false;
    isSkl2Learned = false;
    isSkl3Learned = false;
    isSkl4Learned = false;


    document.querySelector('h1.selectedCharacterName').textContent = `Musketeer's HUD`;
    // Update the individual stats in the HUD
    document.querySelector('.box:nth-child(1) h3').textContent = `Armr: ${Armr}`;

    document.querySelector('.box:nth-child(2) h3').textContent = `Hpe: ${Hpe}`;

    document.querySelector('.box:nth-child(3) h3').textContent = `Spd: ${Spd}`;

    document.querySelector('.box:nth-child(4) h3').textContent = `Rnge: ${Rnge}`;

    document.querySelector('.box:nth-child(5) h3').textContent = `Atk: ${Atk}`;

    document.querySelector('.box:nth-child(6) h3').textContent = `Apm: ${Apm}`; 
    
} else if (selectedCharacter === "Vampire") {

    Armr = 2;
    Hpe = 2;
    Spd = 3;
    Rnge = 200;
    Atk = 5;
    Apm = 70;

    currentHP = 100;
    maxHP = 100;

    skl1 = "Rapier thrash";
    skl2 = "Rapid fire";
    skl3 = "Piercing shot";
    skl4 = "Bounce shot";

    isSkl1Learned = false;
    isSkl2Learned = false;
    isSkl3Learned = false;
    isSkl4Learned = false;


    document.querySelector('h1.selectedCharacterName').textContent = `Musketeer's HUD`;
    // Update the individual stats in the HUD
    document.querySelector('.box:nth-child(1) h3').textContent = `Armr: ${Armr}`;

    document.querySelector('.box:nth-child(2) h3').textContent = `Hpe: ${Hpe}`;

    document.querySelector('.box:nth-child(3) h3').textContent = `Spd: ${Spd}`;

    document.querySelector('.box:nth-child(4) h3').textContent = `Rnge: ${Rnge}`;

    document.querySelector('.box:nth-child(5) h3').textContent = `Atk: ${Atk}`;

    document.querySelector('.box:nth-child(6) h3').textContent = `Apm: ${Apm}`; 
    
} else if (selectedCharacter === "Wizard") {

    Armr = 2;
    Hpe = 2;
    Spd = 3;
    Rnge = 200;
    Atk = 5;
    Apm = 70;

    currentHP = 100;
    maxHP = 100;

    skl1 = "Rapier thrash";
    skl2 = "Rapid fire";
    skl3 = "Piercing shot";
    skl4 = "Bounce shot";

    isSkl1Learned = false;
    isSkl2Learned = false;
    isSkl3Learned = false;
    isSkl4Learned = false;


    document.querySelector('h1.selectedCharacterName').textContent = `Musketeer's HUD`;
    // Update the individual stats in the HUD
    document.querySelector('.box:nth-child(1) h3').textContent = `Armr: ${Armr}`;

    document.querySelector('.box:nth-child(2) h3').textContent = `Hpe: ${Hpe}`;

    document.querySelector('.box:nth-child(3) h3').textContent = `Spd: ${Spd}`;

    document.querySelector('.box:nth-child(4) h3').textContent = `Rnge: ${Rnge}`;

    document.querySelector('.box:nth-child(5) h3').textContent = `Atk: ${Atk}`;

    document.querySelector('.box:nth-child(6) h3').textContent = `Apm: ${Apm}`; 
    
} else if (selectedCharacter === "Mechanic") {

    Armr = 2;
    Hpe = 2;
    Spd = 3;
    Rnge = 200;
    Atk = 5;
    Apm = 70;

    currentHP = 100;
    maxHP = 100;

    skl1 = "Rapier thrash";
    skl2 = "Rapid fire";
    skl3 = "Piercing shot";
    skl4 = "Bounce shot";

    isSkl1Learned = false;
    isSkl2Learned = false;
    isSkl3Learned = false;
    isSkl4Learned = false;


    document.querySelector('h1.selectedCharacterName').textContent = `Musketeer's HUD`;
    // Update the individual stats in the HUD
    document.querySelector('.box:nth-child(1) h3').textContent = `Armr: ${Armr}`;

    document.querySelector('.box:nth-child(2) h3').textContent = `Hpe: ${Hpe}`;

    document.querySelector('.box:nth-child(3) h3').textContent = `Spd: ${Spd}`;

    document.querySelector('.box:nth-child(4) h3').textContent = `Rnge: ${Rnge}`;

    document.querySelector('.box:nth-child(5) h3').textContent = `Atk: ${Atk}`;

    document.querySelector('.box:nth-child(6) h3').textContent = `Apm: ${Apm}`; 
    
} else {
    console.log("No character chosen.");
}


// Handle character selection
let availableTokens = 0;



// Character Xp and level/level up display and functionality
document.addEventListener('DOMContentLoaded', function () {
    let currentLevel = 1;
    let currentXP = 0;

    // stats for character able to level up after gaining a level via xp (excluding current and max hp, which are auto upgraded)
    let abilityTokens = 0;

    // set level 1 stats for character
    let armor = 1;
    let hope = 2;
    let speed = 5;
    let range = 150;
    let attack = 2;
    let atpm = 160;

    let armorLevel = 1;
    let hopeLevel = 1;
    let speedLevel = 1;
    let rangeLevel = 1;
    let attackLevel = 1;
    let atpmLevel = 1;
    
    let maxArmorLevel = 4;
    let maxHopeLevel = 4;
    let maxSpeedLevel = 4;
    let maxRangeLevel = 4;
    let maxAttackLevel = 4;
    let maxAtpmLevel = 4;

    // set booleans for ability upgrades
    let hasMultiShot = false;
    let hasArrowRain = false;
    let hasFeatherMark = false;
    let hasEagleEye = false;

    // set levels for ability upgrades
    let multiShotLevel = 0;
    let arrowRainLevel = 0;
    let featherMarkLevel = 0;
    let eagleEyeLevel = 0;

    const maxMultiShotLevel = 3
    const maxArrowRainLevel = 3;
    const maxFeatherMarkLevel = 3;
    const maxEagleEyeLevel = 3;

    const maxLevel = 21;
    const xpBar = document.getElementById('xp-bar');
    const xpText = document.getElementById('xp-text');
    const hpText = document.getElementById('hp-text');
    const lvlNum = document.getElementById('lvlNum'); // Get the level display element
    const statPage = document.getElementById('stat-page');
    const statChoice = document.getElementById('stat-choice');
    const tokenBar = document.getElementById('token-bar');
    const ability = document.querySelectorAll('.ability-box');

    // Function to calculate XP required for the next level.  Level 1 should require 1000xp to level up.
    function calculateXPForLevel(level) {
        // Substitutes for the xp equation
        let x = currentLevel;
        let y = Math.round(x * x);
        let z = Math.round(y - x);
        const a = 100;
        // gives starting xp for level 1 and base for growth
        let ex = Math.round(z + a);
        // breaks xp amount to %
        let b = Math.round(ex / a);
        // gives 115% of og xp cap
        let c = Math.round(b * 15) + ex;
        let w = Math.round(x - 1);
        // gives difference from current level xp needed and last levels xp needed to level up
        let d = Math.round(w * w - x);
        let las = Math.round(((d + a) / a) * 15) + (d + a);
        let diff = Math.round(c - las);
        let con = Math.round(19 * x);
        let con2 = Math.round(con * 1.6 + (x * 2));
        let pre = Math.round(las + (diff * 2));
        let answer = Math.round(pre + con2 - 48);

        return answer;
    }

    // Function to update the XP bar and check for level up
    function updateXPBar() {
        const xpNeeded = calculateXPForLevel(currentLevel);
        const xpPercentage = Math.min((currentXP / xpNeeded) * 100, 100);
        xpBar.style.width = `${xpPercentage}%`;
        xpText.textContent = `${currentXP} / ${xpNeeded} XP`;

        if (currentXP >= xpNeeded && currentLevel < maxLevel) {
            levelUp();
        } else if (currentLevel === maxLevel) {
            xpBar.style.width = '100%';
            xpText.textContent = `${currentXP} / Max XP`;
            availableTokens++;
        }
    }

     // Function to update HP text
     function updateHPText() {
        hpText.textContent = `${currentHP} / ${maxHP} HP`;
    }

    // Function to handle leveling up
    function levelUp() {
        currentLevel++;
        availableTokens++;
        currentXP = 0; // Reset XP after leveling up
        maxHP += 5; // Increase max HP by 5 each level
        updateXPBar();
        updateHPText();
        lvlNum.textContent = `Level ${currentLevel}`; // Update the displayed level
        console.log(`Leveled up to ${currentLevel}!`);
        upgradeSlots();
    }

    // Function to add XP
    function addXP(amount) {
        if (currentLevel < maxLevel) {
            currentXP += amount;
            updateXPBar();
        }
    }

    function upgradeSlots() {
        const optionsAvailable = availableTokens;
        if (availableTokens >= 1) {
            statPage.textContent = `${availableTokens} UPGRADES AVAILABLE`;
            unlockAbility();
        } else {
            statPage.textContent = `No upgrades available`;
            statChoice.style.backgroundColor = `#241700`;
        }
    }

    function unlockAbility() {
        const levelsWithUnlock = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
    
        if (availableTokens >= 1 && levelsWithUnlock.includes(currentLevel)) {
            abilityTokens++;
            return;
        }
    
        if (abilityTokens >= 1) {
            console.log(`${abilityTokens} Ability token(s) available!`)
        } else {
            console.log(`No ability tokens available.`);
        }
    }

    const boxes = document.querySelectorAll('.character-box');

boxes.forEach(box => {
    box.addEventListener('click', function() {
        boxes.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        selectedCharacterName = this.getAttribute('data-character');
        console.log(`Character ${selectedCharacterName} selected`);
        spawnPlayerCharacter(selectedCharacterName);
        displayCharacterDetails(selectedCharacterName);

        const playButton = document.getElementById('play-button');
        playButton.style.display = 'block';
    });
});

function handleBoxClick(event) {
    if (availableTokens > 0) {
        const box = event.currentTarget;
        const statLevelElement = box.querySelector('p'); // The <p> element showing the level
        let currentStatLevel = parseInt(statLevelElement.textContent.replace('Lvl: ', ''));
        const statId = box.querySelector('h3').id; // Get the id of the <h3> element
        let statValue = parseInt(box.querySelector('h3').textContent.split(': ')[1]); // Get the current stat value

        if (currentStatLevel < 5) {
            currentStatLevel++;
            availableTokens--;

            // Add 1 to the stat value using the upgradeValue function
            statValue = upgradeValue(statId);

            // Update the UI
            statLevelElement.textContent = `Lvl: ${currentStatLevel}`;
            box.querySelector('h3').textContent = `${statId}: ${statValue}`;

            // Check if the stat level is maxed out (5)
            if (currentStatLevel === 5) {
                box.style.backgroundColor = '#ffae00'; // Change box color when max level is reached
                statLevelElement.textContent = `Lvl: ${currentStatLevel} (Max)`;
            }
        } else {
            console.log('Max level reached for this stat.');
        }

        // Update the display of available tokens
        updateTokenDisplay();
    } else {
        console.log('No available tokens to upgrade this stat.');
    }
}

function handleBox2Click(event) {
    if (availableTokens > 0) {
    const skillElement = event.currentTarget;
    let currentSkillLevel = parseInt(skillElement.textContent.split(': ')[1].replace('Lvl ', ''));
    
    if (currentSkillLevel < 4) {
        currentSkillLevel++;
        availableTokens--;
        skillElement.textContent = `${skillElement.id.replace('Skill', 'Skl ')}: Lvl ${currentSkillLevel}`;

        if (currentSkillLevel === 1) {
            skillElement.style.backgroundColor = '#006400'; // Deep green color
            console.log(`${skillElement.id} has become available for use.`);

        } else if (currentSkillLevel > 1) {
            // Placeholder: Make the effect more powerful with each level up
            console.log(`${skillElement.id} has become more powerful at level ${currentSkillLevel}.`);
        }

        if (currentSkillLevel === 4) {
            skillElement.style.backgroundColor = '#ffae00'; // Change color when max level is reached
        }
    }
        // Update the display of available tokens
        updateTokenDisplay();
    } else {
        console.log('Max level reached for this skill.');
    }
}

// Attach the click event listener to each `.box2` element
document.querySelectorAll('.box2').forEach(box2 => {
    box2.addEventListener('click', handleBox2Click);
});

function upgradeValue(stat) {
    if (selectedCharacter === "Archer") {
        switch(stat) {
            case "Armr":
                Armr += 1;
                return Armr;
            case "Hpe":
                Hpe += 1;
                return Hpe;
            case "Spd":
                Spd += 1;
                return Spd;
            case "Rnge":
                Rnge += 1;
                return Rnge;
            case "Atk":
                Atk += 1;
                return Atk;
            case "Apm":
                Apm += 1;
                return Apm;
            default:
                return 0;
        }
    } else if (selectedCharacter === "Musketeer") {
        switch(stat) {
            case "Armr":
                Armr += 1;
                return Armr;
            case "Hpe":
                Hpe += 1;
                return Hpe;
            case "Spd":
                Spd += 1;
                return Spd;
            case "Rnge":
                Rnge += 20;
                return Rnge;
            case "Atk":
                Atk += 1.5;
                return Atk;
            case "Apm":
                Apm += 10;
                return Apm;
            default:
                return 0;
        }
    }
}





// Function to update the display of available tokens
function updateTokenDisplay() {
    const tokenDisplayElement = document.getElementById('stat-page'); // Assuming you have an element for this
    if (availableTokens >= 1) {
        tokenDisplayElement.textContent = `${availableTokens} UPGRADES AVAILABLE`;
    } else {
        tokenDisplayElement.textContent = `NO UPGRADES AVAILABLE`;
    }
}

// Attach click event listeners to all elements with the class 'box'
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', handleBoxClick);
});

// Initial call to update the token display when the page loads

    // Example of adding XP (you can replace this with your game's logic)
    setInterval(() => {
        addXP(50); // Add x XP every 1 second
    }, 1000);

      // Initialize the HP text on page load
      updateHPText();
});


// Spawn player character
function spawnPlayerCharacter(characterName) {
    const existingCharacter = document.querySelector('.player-character');
    if (existingCharacter) {
        existingCharacter.remove();
    }

    const playerCharacter = document.createElement('div');
    playerCharacter.classList.add('player-character');
    playerCharacter.setAttribute('data-character-name', characterName);

    switch (characterName) {
        case 'Archer': playerCharacter.style.backgroundColor = 'blue'; break;
        case 'Musketeer': playerCharacter.style.backgroundColor = 'red'; break;
        case 'Monk': playerCharacter.style.backgroundColor = 'green'; break;
        case 'Ninja': playerCharacter.style.backgroundColor = 'purple'; break;
        case 'Bruiser': playerCharacter.style.backgroundColor = 'yellow'; break;
        case 'Vampire': playerCharacter.style.backgroundColor = 'orange'; break;
        case 'Wizard': playerCharacter.style.backgroundColor = 'pink'; break;
        case 'Mechanic': playerCharacter.style.backgroundColor = 'cyan'; break;
        default: playerCharacter.style.backgroundColor = 'blue';
    }

    const gameBoard = document.getElementById('game-board');
    gameBoard.appendChild(playerCharacter);
}

function startGameWithCharacter(characterId) {
    console.log(`Game started with character ${characterId}`);
    const characterSelectionAside = document.querySelector('aside');
    characterSelectionAside.style.display = 'none';

    // Show the settings aside
    const settingsAside = createSettingsAside();
    document.body.appendChild(settingsAside);

    // Make sure the character is visible for movement
    const playerCharacter = document.querySelector('.player-character');
    if (playerCharacter) {
        playerCharacter.style.position = 'absolute';
        playerCharacter.style.left = '50px'; // Starting position
        playerCharacter.style.top = '50px';  // Starting position
    }
}

function spawnPlayerCharacter(characterId) {
    const existingCharacter = document.querySelector('.player-character');
    if (existingCharacter) {
        existingCharacter.remove();
    }

    const playerCharacter = document.createElement('div');
    playerCharacter.classList.add('player-character');
    playerCharacter.setAttribute('data-character-id', characterId);

    switch (characterId) {
        case '1': playerCharacter.style.backgroundColor = 'blue'; break;
        case '2': playerCharacter.style.backgroundColor = 'red'; break;
        case '3': playerCharacter.style.backgroundColor = 'green'; break;
        case '4': playerCharacter.style.backgroundColor = 'purple'; break;
        case '5': playerCharacter.style.backgroundColor = 'yellow'; break;
        case '6': playerCharacter.style.backgroundColor = 'orange'; break;
        case '7': playerCharacter.style.backgroundColor = 'pink'; break;
        case '8': playerCharacter.style.backgroundColor = 'cyan'; break;
        default: playerCharacter.style.backgroundColor = 'blue';
    }

    const gameBoard = document.getElementById('game-board');
    gameBoard.appendChild(playerCharacter);
}

function displayTabContent(characterId, tabId) {
    let tabContent = document.getElementById('tab-content');
    if (!tabContent) {
        tabContent = document.createElement('div');
        tabContent.id = 'tab-content';
        tabContent.style.color = '#fff';
        tabContent.style.padding = '10px';
        tabContent.style.marginTop = '10px';
        const gameBoard = document.getElementById('game-board');
        gameBoard.appendChild(tabContent);
    }

    const content = characterTabContent[characterId] ? characterTabContent[characterId][tabId] : 'No content available.';
    tabContent.textContent = content;
}
