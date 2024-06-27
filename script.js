// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all the box elements in the aside section
    const boxes = document.querySelectorAll('aside .box');

    // Function to handle box click
    boxes.forEach(box => {
        box.addEventListener('click', function() {
            // Remove 'selected' class from all boxes
            boxes.forEach(b => b.classList.remove('selected'));

            // Add 'selected' class to the clicked box
            this.classList.add('selected');

            // Retrieve the selected character's ID
            const characterId = this.getAttribute('data-character');
            console.log(`Character ${characterId} selected`);

            // Update the game board to spawn the selected character
            spawnPlayerCharacter(characterId);
        });
    });
});

// Function to spawn the player character on the game board
function spawnPlayerCharacter(characterId) {
    // Clear any existing player character
    const existingCharacter = document.querySelector('.player-character');
    if (existingCharacter) {
        existingCharacter.remove();
    }

    // Create a new player character element
    const playerCharacter = document.createElement('div');
    playerCharacter.classList.add('player-character');
    playerCharacter.setAttribute('data-character-id', characterId);

    // Optionally, you can add styles or content based on the characterId
    switch (characterId) {
        case '1':
            playerCharacter.style.backgroundColor = 'blue';
            break;
        case '2':
            playerCharacter.style.backgroundColor = 'red';
            break;
        case '3':
            playerCharacter.style.backgroundColor = 'green';
            break;
        case '4':
            playerCharacter.style.backgroundColor = 'purple';
            break;
        case '5':
            playerCharacter.style.backgroundColor = 'yellow';
            break;
        case '6':
            playerCharacter.style.backgroundColor = 'orange';
            break;
        case '7':
            playerCharacter.style.backgroundColor = 'pink';
            break;
        case '8':
            playerCharacter.style.backgroundColor = 'cyan';
            break;
        default:
            playerCharacter.style.backgroundColor = 'blue'; // Default color
    }

    // Append the player character to the game board
    const gameBoard = document.getElementById('game-board');
    gameBoard.appendChild(playerCharacter);
}

// Define the PlayerCharacter class
class PlayerCharacter {
    constructor(name, health = 100, level = 1, armor = 5, hope = 3, xpBar = 0, speed = 4) {
        this.name = name;  // name of player
        this.health = health;  // player max health
        this.level = level;  // player level
        this.armor = armor;  // amount of damage reduced to player
        this.hope = hope;  // additional healing for player
        this.xpBar = xpBar; // experience bar for leveling up
        this.position = { x: 400, y: 300}; //Initial position of character
        this.speed = speed; // Movement speed of character
    }

    // Method to take damage
    takeDamage(amount) {
        const effectiveDamage = amount - this.armor;
        if (effectiveDamage > 0) {
            this.health -= effectiveDamage;
        }
        if (this.health < 0) this.health = 0;
    }

    // Method to heal
    heal(amount) {
        const effectiveHealing = amount + this.hope;
        if (effectiveHealing > 0) {
            this.health += effectiveHealing;
        }
        if (this.health > 100) this.health = 100;
    }

    // Method to gain experience
    experience(amount) {
        this.xpBar += amount;
        console.log(`${this.name} has gained ${amount} XP.`);
        while (this.xpBar >= 100) {
            this.levelUp();
            this.xpBar -= 100;
        }
    }

    // Method to level up
    levelUp() {
        this.level += 1;
        console.log(`${this.name} is now level ${this.level}!`);
    }

    // Method to move the player character
    move(direction) {
        const gameBoard = document.getElementById('game-board');
        const boardRect = gameBoard.getBoundingClientRect();

        switch (direction) {
            case 'left':
                if (this.position.x - this.speed >= 0) { // Check left boundary
                    this.position.x -= this.speed;
                }
                break;
            case 'up':
                if (this.position.y - this.speed >= 0) { // Check top boundary
                    this.position.y -= this.speed;
                }
                break;
            case 'right':
                if (this.position.x + this.speed <= boardRect.width) { // Check right boundary
                    this.position.x += this.speed;
                }
                break;
            case 'down':
                if (this.position.y + this.speed <= boardRect.height) { // Check bottom boundary
                    this.position.y += this.speed;
                }
                break;
        }

        this.updatePosition();
    }

     // Update the player character's position on the screen
     updatePosition() {
        const playerElement = document.querySelector('.player-character');
        playerElement.style.left = `${this.position.x}px`;
        playerElement.style.top = `${this.position.y}px`;
    }
}

// Define the base stats for the enemy classes.  All enemy classes will be built around this code.
class SmallEnemy {
    // for this constructor, i should be able to switch these stats only to change how the enemy behaves.
    constructor(name, health = 20, xp = 4, attack = 5, armor = 1) {
        this.name = name;
        this.health = health;
        this.xp = xp;
        this.attack = attack;
        this.armor = armor;
        this.isDead = false;
    }
    // Method to take damage
    takeDamage(amount, player) {
        const effectiveDamage = amount - this.armor;
        if (effectiveDamage > 0) {
            this.health -= effectiveDamage;
        }
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
            console.log(`${this.name} is defeated!`);
            player.experience(this.xp);
        }
    }
}

class BruteEnemy {
    constructor(name, health = 50, xp = 12, attack = 15, armor = 2) {
        this.name = name;
        this.health = health;
        this.xp = xp;
        this.attack = attack;
        this.armor = armor;
        this.isDead = false;
    }

    takeDamage(amount, player) {
        const effectiveDamage = amount - this.armor;
        if (effectiveDamage > 0) {
            this.health -= effectiveDamage;
        }
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
            console.log(`${this.name} is defeated!`);
            player.experience(this.xp);
        }
    }
}

class fastEnemy {
    constructor(name, health = 10, xp = 4, attack = 3, armor = 0) {
        this.name = name;
        this.health = health;
        this.xp = xp;
        this.attack = attack;
        this.armor = armor;
        this.isDead = false;
    }
    // Method to take damage
    takeDamage(amount, player) {
        const effectiveDamage = amount - this.armor;
        if (effectiveDamage > 0) {
            this.health -= effectiveDamage;
        }
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
            console.log(`${this.name} is defeated!`);
            player.experience(this.xp);
        }
    }
}

class bossEnemy1 {
    constructor(name, health = 100, xp = 35, attack = 15, armor = 3) {
        this.name = name;
        this.health = health;
        this.xp = xp;
        this.attack = attack;
        this.armor = armor;
        this.isDead = false;
    }
    // Method to take damage
    takeDamage(amount, player) {
        const effectiveDamage = amount - this.armor;
        if (effectiveDamage > 0) {
            this.health -= effectiveDamage;
        }
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
            console.log(`${this.name} is defeated!`);
            player.experience(this.xp);
        }
    }
}

class bossEnemy2 {
    constructor(name, health = 150, xp = 35, attack = 25, armor = 5) {
        this.name = name;
        this.health = health;
        this.xp = xp;
        this.attack = attack;
        this.armor = armor;
        this.isDead = false;
    }
    // Method to take damage
    takeDamage(amount, player) {
        const effectiveDamage = amount - this.armor;
        if (effectiveDamage > 0) {
            this.health -= effectiveDamage;
        }
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
            console.log(`${this.name} is defeated!`);
            player.experience(this.xp);
        }
    }
}

class bossEnemy3 {
    constructor(name, health = 200, xp = 40, attack = 25, armor = 8) {
        this.name = name;
        this.health = health;
        this.xp = xp;
        this.attack = attack;
        this.armor = armor;
        this.isDead = false;
    }
    // Method to take damage
    takeDamage(amount, player) {
        const effectiveDamage = amount - this.armor;
        if (effectiveDamage > 0) {
            this.health -= effectiveDamage;
        }
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
            console.log(`${this.name} is defeated!`);
            player.experience(this.xp);
        }
    }
}

class hunterEnemy {
    constructor(name, health = 40, xp = 5, attack = 15, armor = 4) {
        this.name = name;
        this.health = health;
        this.xp = xp;
        this.attack = attack;
        this.armor = armor;
        this.isDead = false;
    }
    // Method to take damage
    takeDamage(amount, player) {
        const effectiveDamage = amount - this.armor;
        if (effectiveDamage > 0) {
            this.health -= effectiveDamage;
        }
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
            console.log(`${this.name} is defeated!`);
            player.experience(this.xp);
        }
    }
}

class ExplosiveEnemy {
    constructor(name, health = 15, xp = 2, attack = 40, armor = 6) {
        this.name = name;
        this.health = health;
        this.xp = xp;
        this.attack = attack;
        this.armor = armor;
        this.isDead = false;
        this.position = { x: 0, y: 0 }; // Initial position (can be set dynamically)
    }

    // Method to take damage
    takeDamage(amount, player) {
        const effectiveDamage = amount - this.armor;
        if (effectiveDamage > 0) {
            this.health -= effectiveDamage;
        }
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
            console.log(`${this.name} is defeated!`);
            player.experience(this.xp);
        }
    }

    // Method to update position (move towards player)
    moveTowards(player) {
        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize the vector to get the direction
        const direction = { x: dx / distance, y: dy / distance };

        // Move towards the player by a certain speed (e.g., 2px per frame)
        const speed = 2;
        this.position.x += direction.x * speed;
        this.position.y += direction.y * speed;

        // Check if within detonation range (10px)
        if (distance <= 10) {
            this.detonate(player);
        }
    }

    // Method to detonate and deal damage
    detonate(player) {
        console.log(`${this.name} detonates!`);
        const explosionRadius = 50; // Radius of the explosion

        // Calculate distance to player and deal damage
        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

        if (distanceToPlayer <= explosionRadius) {
            console.log(`${this.name} deals ${this.attack} damage to ${player.name}`);
            player.takeDamage(this.attack);
        }

        // Mark the enemy as dead after detonation
        this.isDead = true;
    }
}


// Example usage:
// Creating instances of the player and enemies
const player = new PlayerCharacter('Player1');
const enemy1 = new SmallEnemy('Enemy1');
const enemy2 = new SmallEnemy('Enemy2');

// Displaying initial states
console.log(player);
console.log(enemy1);
console.log(enemy2);

// Simulating interactions
player.takeDamage(10);
console.log(player);

enemy1.takeDamage(25, player); // Player earns XP if enemy1 is defeated
console.log(player);
console.log(enemy1);

enemy2.takeDamage(15, player); // Player earns XP if enemy2 is defeated
console.log(player);
console.log(enemy2);