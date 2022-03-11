// Declare a function to select a random value from a dictionary
// Source: https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
}
// Function to generate a random ID
// Source: https://gist.github.com/gordonbrander/2230317
function generateUniqueID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 9);
}
// Function to get a selected value from a radio group
function getSelectedValueFromRadioGroup(radioGroupName){
    let initialize = document.getElementsByName(radioGroupName)
    initialize.forEach(element => {
        if (element.checked){ initialize = element.value }
    })
    return initialize
}
// Function to set the listeners for the page
function setListener() {
    let creator = document.getElementsByName('method')
    creator.forEach(element => {
        const ID = element.id
        element.addEventListener('change', function() { populateCreator() })
    });
}
// Function to populate the creator div
function populateCreator(){
    let method = getSelectedValueFromRadioGroup('method') // Get the selected method
    let creator = document.getElementById('creator') // Get the creator element that gets populated with the proper HTML
    $(creator).load(`html_templates/${method}.html`) // Populate the innerHTML based on the selected method
}
// FUnction to set Random listeners
function setListenersRandom(){
    let creator = document.getElementsByName('generation-method')
    creator.forEach(element => {
        element.addEventListener('change', function() { populateGenerator() })
    });
}
// Function to populate the generator div
function populateGenerator(){
    let method = getSelectedValueFromRadioGroup('generation-method') // Get the selected method
    let creator = document.getElementById('generator') // Get the creator element that gets populated with the proper HTML
    $(creator).load(`html_templates/random_generator_templates/${method}.html`) // Populate the innerHTML based on the selected method
}
// Function to capitalize the first letter of a string
function capitalize(str){
    const arr = str.split(" ")
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ")
}
// Function to randomly generate a monster based on user inputs
function generateMonster(){
    function adjustProperty(ID, monster){
        if (monster[`${ID}`] == "") { // Damage Immunities
            let elements = document.getElementsByName(`${ID}`) 
            elements.forEach(element => {
                element.style.display = 'none'
            });
        } else { 
            document.getElementById(`${ID}`).innerText = monster[`${ID}`]
            let elements = document.getElementsByName(`${ID}`) 
            elements.forEach(element => {
                element.style.display = 'inline'
            });
        }
    }
    function adjustAction(inputList, ID){
        if (inputList) {
            document.getElementById(ID).innerHTML = ''
            inputList.forEach(element => {
                if (element.name != 'Spellcasting') {
                    document.getElementById(ID).innerHTML += `
                    <property-block>
                        <h4>${element.name}.</h4>
                        <p>${element.desc}</p>
                    </property-block>`
                } else {
                    document.getElementById(ID).innerHTML += `
                    <property-block>
                        <h4>${element.name}.</h4>
                        <p id="monster-spells"></p>
                    </property-block>`
                    document.getElementById('monster-spells').innerText = element.desc
                }
            });
            document.getElementById(ID).style.display = 'inline'
            if (ID != 'special_abilities') { document.getElementById(`${ID}_header`).style.display = 'block' }
        } else { 
            document.getElementById(ID).style.display = 'none'
            if (ID != 'special_abilities') { document.getElementById(`${ID}_header`).style.display = 'none' }
        }
    }
    let method = getSelectedValueFromRadioGroup('generation-method') // Get the selected method
    let role = getSelectedValueFromRadioGroup('role-selector')
    // Generate a monster based on Challenge Rating
    if (method == 'CR') {
        const cr = document.getElementById('cr').value
        if (cr == 'select') { 
            alert('Please select a CR!') 
            return
        }
        fetch(`data/WOTC_5e_SRD_v5.1/monsters.json`)
            .then(response => {
                return response.json();
            })
            .then(jsondata => {
                let monsters = jsondata.filter(i => i.challenge_rating === cr)
                let monster = randomProperty(monsters)
                console.log("Monster:", monster)
                // ========================
                //    General Properties
                // ========================
                document.getElementById('monster-name').innerText = monster.name // Set the Monster's name
                document.getElementById('monster-properties').innerText = `${monster.size} ${monster.type}, ${monster.alignment}` // Set its properties
                document.getElementById('armor-class').innerText = `${monster.armor_class}`
                if (monster.armor_desc != null) { document.getElementById('armor-class').innerText += ` (${(monster.armor_desc).replaceAll("_", "")})` }
                document.getElementById('hit-points').innerText = `${monster.hit_points} (${monster.hit_dice})` 
                document.getElementById('speed').innerText = monster.speed
                document.getElementById('challenge-rating').innerText = monster.challenge_rating
                // ========================
                //     Ability Scores
                // ========================
                let abilitiesElement = document.getElementById('abilities')
                abilitiesElement.innerHTML = ""
                abilitiesElement.innerHTML = `<abilities-block data-cha="${monster.charisma}" data-con="${monster.constitution}" data-dex="${monster.dexterity}" data-int="${monster.intelligence}" data-str="${monster.strength}" data-wis="${monster.wisdom}"></abilities-block>`
                // ========================
                //           Saves
                // ========================
                function saves() {
                    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
                    let saves = []
                    abilities.forEach(element => {
                        if (monster[`${element}_save`]) {
                            if ( monster[`${element}_save`] > 0 ) { saves.push(`${capitalize(element.slice(0, 3))} +${monster[`${element}_save`]}`) } 
                            else { saves.push(`${capitalize(element.slice(0, 3))} ${monster[`${element}_save`]}`) }
                        }
                    })
                    if ( saves.length > 0 ) { 
                        document.getElementById('saving_throws').innerText = saves.join(", ")
                        let elements = document.getElementsByName('saving_throws') 
                        elements.forEach(element => {
                            element.style.display = 'inline'
                        });
                    }
                    else {
                        let elements = document.getElementsByName('saving_throws') 
                        elements.forEach(element => {
                            element.style.display = 'none'
                        });
                    }
                }
                saves()
                // ========================
                //           Skills
                // ========================
                function skills() {
                    const skills = ['acrobatics', 'animal handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight of hand', 'stealth', 'survival']
                    let monsterSkills = []
                    skills.forEach(element => {
                        if(monster[element]) { 
                            if (monster[element] > 0) { monsterSkills.push(`${capitalize(element)} +${monster[element]}`) }
                            else { monsterSkills.push(`${capitalize(element)} ${monster[element]}`) }
                        }
                    });
                    if (monsterSkills.length > 0) { 
                        document.getElementById('skills').innerText = monsterSkills.join(", ")
                        let elements = document.getElementsByName('skills') 
                        elements.forEach(element => {
                            element.style.display = 'inline'
                        });
                    }
                    else {
                        let elements = document.getElementsByName('skills') 
                        elements.forEach(element => {
                            element.style.display = 'none'
                        });
                    }
                }
                skills()
                // ========================
                //   Physical Attributes
                // ========================
                adjustProperty('damage_immunities', monster) // Damage Immunities
                adjustProperty('damage_resistances', monster) // Damage Resistances
                adjustProperty('damage_vulnerabilities', monster) // Damage Vulnerabilities
                adjustProperty('condition_immunities', monster) // Condition Immunities
                adjustProperty('senses', monster) // Senses
                adjustProperty('languages', monster) // Languages
                // ========================
                //     Special Abilities
                // ========================
                let specialAbilities = monster.special_abilities
                adjustAction(specialAbilities, 'special_abilities')
                // ========================
                //         Actions
                // ========================
                let actions = monster.actions
                adjustAction(actions, 'actions')
                // ========================
                //    Legendary Actions
                // ========================
                let legendaryActions = monster.legendary_actions
                if (legendaryActions){ document.getElementById('legendary_actions').innerHTML += monster.legendary_desc }
                adjustAction(legendaryActions, 'legendary_actions')
                // ========================
                //       Update Dom
                // ========================
                let output = document.getElementById('output') // Make the statblock visible
                let outputDisplay = output.style.display
                if (outputDisplay == 'none') { output.style.display = 'block'}
            })
    }
    // Generate a monster based on party composition
    else if (method == 'Party') {
        const difficulty = getSelectedValueFromRadioGroup('difficulty')
        const pcElements = document.getElementsByClassName('player-character')
        console.log("PC Elements:", pcElements)
        let PCs = []
        for (let index = 0; index < pcElements.length; index++) {
            const element = pcElements[index];
            const PC = (element.innerText).replace(" ", "").replace("Level", "").replace(" ", "")
            PCs.push(PC)
        }
        console.log("PCs:", PCs)
        console.log("Difficulty:", difficulty)
    }
}
// Function to add a PC to the party
function addPC(){
    const level = document.getElementById('lvl').value
    if (level == 'select') {
        alert("Please select a level.")
        return
    }
    let characters = document.getElementById('player-characters')
    characters.innerHTML += `<span class="player-character" id="pc-${generateUniqueID()}">
                                <span name="pc">Level ${level}</span>
                                <i class="fa-solid fa-trash" name="delete-PC"></i>
                            </span>`
    // Set delete listeners
    let trashIcons = document.getElementsByName('delete-PC')
    trashIcons.forEach(element => {
        element.addEventListener('click', function() {
            this.parentElement.remove()
        })
    });
}