// Character setup and functions
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

// TODO: MAY NOT NEED THIS, DEPENDING
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

// Define specific character classes
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