// Retrieve the selected character from local storage
const selectedCharacter = localStorage.getItem('selectedCharacterName');

// Update the header with the selected character's name
if (selectedCharacter) {
    document.querySelector('h1.selectedCharacterName').textContent = `${selectedCharacter}'s HUD`;
}

// Handle character selection
let selectedCharacterName = null;



// Character Xp and level/level up display and functionality
document.addEventListener('DOMContentLoaded', function () {
    let currentLevel = 1;
    let currentXP = 0;

    // stats for character able to level up after gaining a level via xp (excluding current and max hp, which are auto upgraded)
    let currentHP = 75;
    let maxHP = 75;
    let availableTokens = 0;
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
        let answer = Math.round(pre + con2 - 46);

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
        currentHP = maxHP; // Reset current HP to max HP
        updateXPBar();
        updateHPText();
        lvlNum.textContent = `Level ${currentLevel}`; // Update the displayed level
        console.log(`Leveled up to ${currentLevel}!`);
        // upgradeSlots();
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
            statPage.textContent = `UPGRADES AVAILABLE`;
            tokenBar.textContent = `Tokens: ${availableTokens}`;
            statChoice.style.backgroundColor = `#00b7ff`;
            unlockAbility();
        } else {
            statPage.textContent = `No upgrades available`;
            statChoice.style.backgroundColor = `#241700`;
        }
    }

    function unlockAbility() {
        if (availableTokens >= 1 && currentLevel === 3, 5, 7, 9, 11, 13, 15, 17, 19, 21) {
            abilityTokens++;
        }


        if (abilityTokens >= 1) {
            ability.style.backgroundColor = `#00b7ff`;
            ability.style.color = `#fff`;
        } else {
            ability.style.backgroundColor = `#241700`;
            ability.style.color = `#fff`;
        }
    }



    // Example of adding XP (you can replace this with your game's logic)
    setInterval(() => {
        addXP(1); // Add x XP every 1 second
    }, 1000);

      // Initialize the HP text on page load
      updateHPText();
});



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
    // Implement game start logic here, using the characterId
    // Hide the character selection aside
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

function handleMovement(event) {
    document.addEventListener('DOMContentLoaded', function() {
        const movementKeys = { 'ArrowUp': false, 'ArrowDown': false, 'ArrowLeft': false, 'ArrowRight': false, 'w': false, 's': false, 'a': false, 'd': false };
        let moveInterval = null;
        const stepSize = 5; // Number of pixels to move per interval
    
        document.addEventListener('keydown', function(event) {
            if (movementKeys.hasOwnProperty(event.key)) {
                movementKeys[event.key] = true;
                if (!moveInterval) {
                    moveInterval = setInterval(moveCharacter, 20); // Move every 20ms
                }
            }
        });
    
        document.addEventListener('keyup', function(event) {
            if (movementKeys.hasOwnProperty(event.key)) {
                movementKeys[event.key] = false;
                if (Object.values(movementKeys).every(val => !val)) {
                    clearInterval(moveInterval);
                    moveInterval = null;
                }
            }
        });
    
        function moveCharacter() {
            const playerCharacter = document.querySelector('.player-character');
            if (!playerCharacter) return;
        
            const gameBoard = document.getElementById('game-board');
            const gameBoardRect = gameBoard.getBoundingClientRect();
            const playerRect = playerCharacter.getBoundingClientRect();
        
            // Convert current position to integer
            let newLeft = parseInt(playerCharacter.style.left || '0', 10);
            let newTop = parseInt(playerCharacter.style.top || '0', 10);
        
            // Debug logs to check dimensions
            console.log('Game Board Rect:', gameBoardRect);
            console.log('Player Rect:', playerRect);
            console.log('Current Position:', { newLeft, newTop });
        
            // Calculate new position based on movement keys
            if (movementKeys['ArrowUp'] || movementKeys['w']) {
                newTop = Math.max(0, newTop - stepSize); // Ensure newTop is not less than 0
            }
            if (movementKeys['ArrowDown'] || movementKeys['s']) {
                newTop = Math.min(gameBoardRect.height - playerRect.height, newTop + stepSize); // Ensure newTop is within the game board
            }
            if (movementKeys['ArrowLeft'] || movementKeys['a']) {
                newLeft = Math.max(0, newLeft - stepSize); // Ensure newLeft is not less than 0
            }
            if (movementKeys['ArrowRight'] || movementKeys['d']) {
                newLeft = Math.min(gameBoardRect.width - playerRect.width, newLeft + stepSize); // Ensure newLeft is within the game board
            }
        
            // Apply the new position
            playerCharacter.style.left = `${newLeft}px`;
            playerCharacter.style.top = `${newTop}px`;
        
            // Additional debug logs
            console.log('New Position:', { newLeft, newTop });
        }
    });
}