let selectedCharacter = localStorage.getItem('selectedCharacterName');
let selectedCharacterName = null;
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