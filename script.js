// Retrieve the selected character from local storage
const selectedCharacter = localStorage.getItem('selectedCharacterName');

// Update the header with the selected character's name
if (selectedCharacter) {
    document.querySelector('h1.selectedCharacterName').textContent = `${selectedCharacter}'s HUD`;
}

// Handle character selection
let selectedCharacterName = null;







document.addEventListener('DOMContentLoaded', function () {
    let currentLevel = 1;
    let currentXP = 0;
    const maxLevel = 21;
    const xpBar = document.getElementById('xp-bar');
    const xpText = document.getElementById('xp-text');
    const lvlNum = document.getElementById('lvlNum'); // Get the level display element

    // Function to calculate XP required for the next level
    function calculateXPForLevel(level) {
        return 500 + (level - 1) * 100;
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

    // Function to handle leveling up
    function levelUp() {
        currentLevel++;
        currentXP = 0; // Reset XP after leveling up
        updateXPBar();
        lvlNum.textContent = `Level ${currentLevel}`; // Update the displayed level
        console.log(`Leveled up to ${currentLevel}!`);
    }

    // Function to add XP
    function addXP(amount) {
        if (currentLevel < maxLevel) {
            currentXP += amount;
            updateXPBar();
        }
    }

    // Example of adding XP (you can replace this with your game's logic)
    setInterval(() => {
        addXP(50); // Add 50 XP every 2 seconds
    }, 2000);
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