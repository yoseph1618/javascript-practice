// Retrieve the selected character from local storage
const selectedCharacter = localStorage.getItem('selectedCharacterName');

// Update the header with the selected character's name
if (selectedCharacter) {
    document.querySelector('h1.selectedCharacterName').textContent = `${selectedCharacter}'s HUD`;
}


// Define character data
const characterTabContent = {
    Archer: {
        1: "Skills: Multi-shot, Arrow rain, Feather mark, Eagle eye.",
        2: "Stats: 75 HP, 1 armor, 2 hope, 5 speed, 150 rng, 2 atk, 160 atpm.",
        3: "Backstory: A skilled marksman from the Newea Forest blessed with knowledge and a bow from the wind itself.",
        4: "Strengths: Long-range attacks, speed, and agility.",
        5: "Bonuses given: +1 speed, +20 atpm.",
        6: "Friends: Monk, Bruiser, Wizard.",
        7: "Enemies: Ninja."
    },
    Musketeer: {
        1: "Skills: Rapier thrash, Rapid fire, Piercing shot, Bounce shot.",
        2: "Stats: 100 HP, 2 armor, 2 hope, 3 speed, 200 rng, 5 atk, 70 atpm.",
        3: "Backstory: A noble from the empire's elite guards.",
        4: "Strengths: Precision shooting, high damage and range.",
        5: "Bonuses given: +20 rng, +1 atk.",
        6: "Friends: Bruiser, Wizard, Mechanic.",
        7: "Enemies: Ninja, Vampire."
    },
    Monk: {
        1: "Skills: Sweeping kick, Dash, Chi blast, 1-inch punch.",
        2: "Stats: 120 HP, 2 armor, 4 hope, 6 speed, 20 rng, 1 atk, 240 atpm.",
        3: "Backstory: A disciplined practitioner of martial arts.",
        4: "Strengths: High defenses with quick movement and attack speed.",
        5: "Bonuses given: +2 hope, +20 atpm.",
        6: "Friends: Archer, Vampire, Wizard.",
        7: "Enemies: Ninja."
    },
    Ninja: {
        1: "Skills: Double slash, Vanish, Poison knife, Meditation.",
        2: "Stats: 90 HP, 2 armor, 1 hope, 5 speed, 40 rng, 3 atk, 120 atpm.",
        3: "Backstory: A shadow warrior trained gruesomely in the unknown regions beyond the north fogs.",
        4: "Strengths: Speed and attacks.",
        5: "Bonuses given: +1 atk, +30 atpm.",
        6: "Friends: Mechanic.",
        7: "Enemies: Archer, Musketeer, Monk, Bruiser, Vampire, Wizard."
    },
    Bruiser: {
        1: "Skills: Charge, Shield bash, Spin attack, Ground slam.",
        2: "Stats: 200 HP, 3 armor, 6 hope, 3 speed, 35 rng, 6 atk, 60 atpm.",
        3: "Backstory: Royal guardian for the King of Adrelemoor, trained from birth to have but one purpose, protect the King.",
        4: "Strengths: High durability.",
        5: "Bonuses given: +30 HP, +1 hope, +1 atk.",
        6: "Friends: Archer, Musketeer, Mechanic.",
        7: "Enemies: Ninja."
    },
    Vampire: {
        1: "Skills: Life drain, Bat transformation, Werewolf transformation, Mist transformation.",
        2: "Stats: 130 HP, 1 armor, 1 hope, 4 speed, 90 rng, 3 atk, 120 atpm.",
        3: "Backstory: A dark creature of the night with little known about it other than the many names it has been called.",
        4: "Strengths: Healing, sustainability, and versatility.",
        5: "Bonuses given: +10 HP, +1 speed, +10 rng, +10 atpm.",
        6: "Friends: Bruiser, Mechanic.",
        7: "Enemies: Archer, Ninja, Wizard."
    },
    Wizard: {
        1: "Skills: Buff, Eldritch blast, Magic missile, Magic storm.",
        2: "Stats: 100 HP, 1 armor, 3 hope, 3 speed, 130 rng, 3 atk, 90 atpm.",
        3: "Backstory: A master of arcane arts.",
        4: "Strengths: High magical power, range.",
        5: "Weaknesses: Low physical defense, requires mana.",
        6: "Friends: Archer, Musketeer, Monk, Bruiser.",
        7: "Enemies: Ninja, Vampire."
    },
    Mechanic: {
        1: "Skills: Turret, Black powder enhancement, Defensive enhancement, WD-40.",
        2: "Stats: 65 HP, 1 armor, 4 hope, 3 speed, 30 rng, 2 atk, 120 atpm.",
        3: "Backstory: An engineer with a knack for inventions.",
        4: "Strengths: Versatility, high defense.",
        5: "Weaknesses: Slow movement, complex mechanics.",
        6: "Friends: Robots, Technicians.",
        7: "Enemies: Saboteurs, Hackers."
    }
};

const characterAttributes = {
    Archer: { speed: 5 },
    Musketeer: { speed: 3 },
    Monk: { speed: 6 },
    Ninja: { speed: 5 },
    Bruiser: { speed: 3 },
    Vampire: { speed: 4 },
    Wizard: { speed: 3 },
    Mechanic: { speed: 3 }
};

// Handle character selection
let selectedCharacterName = null;

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

// standard base character stats for all characters to call upon
class Character {
    constructor(hp, armor, hope, speed, range, attack, attackPerMinute, skills, backstory, strengths, bonuses, friends, enemies) {
        this.hp = hp;
        this.armor = armor;
        this.hope = hope;
        this.speed = speed;
        this.range = range;
        this.attack = attack;
        this.attackPerMinute = attackPerMinute;
        this.skills = skills;
        this.backstory = backstory;
        this.strengths = strengths;
        this.bonuses = bonuses;
        this.friends = friends;
        this.enemies = enemies;
    }
}

class Archer extends Character {
    constructor() {
        super(
            75, 1, 2, 5, 150, 2, 160,
            ["Multi-shot", "Arrow rain", "Feather mark", "Eagle eye"],
            "A skilled marksman from the Newea Forest blessed with knowledge and a bow from the wind itself.",
            "Long-range attacks, speed, and agility.",
            { speed: 1, attackPerMinute: 20 },
            ["Monk", "Bruiser", "Wizard"],
            ["Ninja"]
        );
    }
}

class Musketeer extends Character {
    constructor() {
        super(
        this.hp = 75,
        this.armor = 1,
        this.hope = 2,
        this.speed = 5,
        this.range = 150,
        this.attack = 2,
        this.attackPerMinute = 160,
        this.skills = ["Multi-shot", "Arrow rain", "Feather mark", "Eagle eye"],
        this.bonuses = { speed: 1, attackPerMinute: 20 },
        this.friends = ["Monk", "Bruiser", "Wizard"],
        this.enemies = ["Ninja"],
        );
    }
} 

class Monk extends Character {
    constructor() {
        super(
        this.hp = 75,
        this.armor = 1,
        this.hope = 2,
        this.speed = 5,
        this.range = 150,
        this.attack = 2,
        this.attackPerMinute = 160,
        this.skills = ["Multi-shot", "Arrow rain", "Feather mark", "Eagle eye"],
        this.bonuses = { speed: 1, attackPerMinute: 20 },
        this.friends = ["Monk", "Bruiser", "Wizard"],
        this.enemies = ["Ninja"],
        );
    }
} 

class Ninja extends Character {
    constructor() {
        super(
        this.hp = 75,
        this.armor = 1,
        this.hope = 2,
        this.speed = 5,
        this.range = 150,
        this.attack = 2,
        this.attackPerMinute = 160,
        this.skills = ["Multi-shot", "Arrow rain", "Feather mark", "Eagle eye"],
        this.bonuses = { speed: 1, attackPerMinute: 20 },
        this.friends = ["Monk", "Bruiser", "Wizard"],
        this.enemies = ["Ninja"],
        );
    }
} 

class Bruiser extends Character {
    constructor() {
        super(
        this.hp = 75,
        this.armor = 1,
        this.hope = 2,
        this.speed = 5,
        this.range = 150,
        this.attack = 2,
        this.attackPerMinute = 160,
        this.skills = ["Multi-shot", "Arrow rain", "Feather mark", "Eagle eye"],
        this.bonuses = { speed: 1, attackPerMinute: 20 },
        this.friends = ["Monk", "Bruiser", "Wizard"],
        this.enemies = ["Ninja"],
        );
    }
} 

class Vampire extends Character {
    constructor() {
        super(
        this.hp = 75,
        this.armor = 1,
        this.hope = 2,
        this.speed = 5,
        this.range = 150,
        this.attack = 2,
        this.attackPerMinute = 160,
        this.skills = ["Multi-shot", "Arrow rain", "Feather mark", "Eagle eye"],
        this.bonuses = { speed: 1, attackPerMinute: 20 },
        this.friends = ["Monk", "Bruiser", "Wizard"],
        this.enemies = ["Ninja"],
        );
    }
} 

class Wizard extends Character {
    constructor() {
        super(
        this.hp = 75,
        this.armor = 1,
        this.hope = 2,
        this.speed = 5,
        this.range = 150,
        this.attack = 2,
        this.attackPerMinute = 160,
        this.skills = ["Multi-shot", "Arrow rain", "Feather mark", "Eagle eye"],
        this.bonuses = { speed: 1, attackPerMinute: 20 },
        this.friends = ["Monk", "Bruiser", "Wizard"],
        this.enemies = ["Ninja"],
        );
    }
} 

class Mechanic extends Character {
    constructor() {
        super(
        this.hp = 75,
        this.armor = 1,
        this.hope = 2,
        this.speed = 5,
        this.range = 150,
        this.attack = 2,
        this.attackPerMinute = 160,
        this.skills = ["Multi-shot", "Arrow rain", "Feather mark", "Eagle eye"],
        this.bonuses = { speed: 1, attackPerMinute: 20 },
        this.friends = ["Monk", "Bruiser", "Wizard"],
        this.enemies = ["Ninja"],
        );
    }
} 

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('aside .box');
    let selectedCharacterId = null;

    boxes.forEach(box => {
        box.addEventListener('click', function() {
            boxes.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedCharacterId = this.getAttribute('data-character');
            console.log(`Character ${selectedCharacterId} selected`);
            spawnPlayerCharacter(selectedCharacterId);
            displayCharacterDetails(selectedCharacterId);

            // Show the play button
            const playButton = document.getElementById('play-button');
            playButton.style.display = 'block';
        });
    });

    // Handle the Play button click
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', function() {
        if (selectedCharacterId) {
            startGameWithCharacter(selectedCharacterId);
        } else {
            alert('Please select a character first!');
        }
    });

    // Handle keydown events for character movement
    document.addEventListener('keydown', handleMovement);
});

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

function displayCharacterDetails(characterId) {
    const existingImage = document.querySelector('.character-image');
    if (existingImage) {
        existingImage.remove();
    }

    const characterImage = document.createElement('div');
    characterImage.classList.add('character-image');
    characterImage.style.backgroundImage = `url('images/character-${characterId}.png')`;

    const gameBoard = document.getElementById('game-board');
    gameBoard.appendChild(characterImage);

    const tabs = document.createElement('div');
    tabs.classList.add('tabs');

    for (let i = 1; i <= 7; i++) {
        const tab = document.createElement('button');
        tab.textContent = `Tab ${i}`;
        tab.setAttribute('data-tab', i);
        tab.addEventListener('click', function() {
            displayTabContent(characterId, i);
        });
        tabs.appendChild(tab);
    }

    const existingTabs = document.querySelector('.tabs');
    if (existingTabs) {
        existingTabs.remove();
    }

    gameBoard.appendChild(tabs);
    displayTabContent(characterId, 1);
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

function createSettingsAside() {
    const settingsAside = document.createElement('aside');
    settingsAside.classList.add('settings-aside');

    const pausePlayButton = document.createElement('button');
    pausePlayButton.textContent = 'Pause';
    pausePlayButton.addEventListener('click', function() {
        if (pausePlayButton.textContent === 'Pause') {
            pausePlayButton.textContent = 'Play';
            // Add pause logic here
        } else {
            pausePlayButton.textContent = 'Pause';
            // Add play logic here
        }
    });

    const volumeLabel = document.createElement('label');
    volumeLabel.textContent = 'Volume';
    volumeLabel.htmlFor = 'volume-control';

    const volumeControl = document.createElement('input');
    volumeControl.type = 'range';
    volumeControl.min = '0';
    volumeControl.max = '100';
    volumeControl.value = '50';
    volumeControl.addEventListener('input', function() {
        const volume = volumeControl.value;
        console.log(`Volume set to ${volume}`);
        // Add volume control logic here
    });

    const quitButton = document.createElement('button');
    quitButton.textContent = 'Quit';
    quitButton.addEventListener('click', function() {
        // Add quit logic here
        alert('Game has been quit.');
    });

    settingsAside.appendChild(pausePlayButton);
    settingsAside.appendChild(volumeControl);
    settingsAside.appendChild(quitButton);

    return settingsAside;
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