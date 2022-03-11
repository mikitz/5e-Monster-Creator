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
// Function to randomly generate a monster based on user inputs
function generateMonster(){
    let method = getSelectedValueFromRadioGroup('generation-method') // Get the selected method
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
                if (monster.armor_desc != null) { document.getElementById('armor-class').innerText += ` (${monster.armor_desc})` }
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
                const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
                // ========================
                //           Skills
                // ========================
                const skills = ['acrobatics', 'animal handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight of hand', 'stealth', 'survival']
                // ========================
                //   Physical Attributes
                // ========================
                if (monster.damage_immunities == "") { // Damage Immunities
                    let elements = document.getElementsByName('damage-immunities') 
                    elements.forEach(element => {
                        element.style.display = 'none'
                        element.innerText = ""
                    });
                } else { document.getElementById('damage-immunities').innerText = monster.damage_immunities }
                // ************************************
                if (monster.damage_resistances == "") { // Damage Resistances
                    let elements = document.getElementsByName('damage-resistances') 
                    elements.forEach(element => {
                        element.style.display = 'none'
                        element.innerText = ""
                    });
                } else { document.getElementById('damage-resistances').innerText = monster.damage_resistances }
                // ************************************
                if (monster.damage_vulnerabilities == "") { // Damage Vulnerabilities
                    let elements = document.getElementsByName('damage-vulnerabilities') 
                    elements.forEach(element => {
                        element.style.display = 'none'
                        element.innerText = ""
                    });
                } else { document.getElementById('damage-vulnerabilities').innerText = monster.damage_vulnerabilities }
                // ************************************
                if (monster.condition_immunities == "") { // Condition Immunities
                    let elements = document.getElementsByName('condition-immunities') 
                    elements.forEach(element => {
                        element.style.display = 'none'
                        element.innerText = ""
                    });
                } else { document.getElementById('condition-immunities').innerText = monster.condition_immunities }
                // ************************************
                if (monster.senses == "") { // Senses
                    let elements = document.getElementsByName('senses') 
                    elements.forEach(element => {
                        element.style.display = 'none'
                    });
                } else { document.getElementById('senses').innerText = monster.senses }
                // ************************************
                if (monster.languages == "") { // Languages
                    let elements = document.getElementsByName('languages') 
                    elements.forEach(element => {
                        element.style.display = 'none'
                    });
                } else { document.getElementById('languages').innerText = monster.languages }
                // ========================
                //     Special Abilities
                // ========================
                let specialAbilities = monster.special_abilities
                // ========================
                //         Actions
                // ========================
                let actions = monster.actions
                // ========================
                //    Legendary Actions
                // ========================
                let legendaryActions = monster.legendary_actions
                // ========================
                //       Update Dom
                // ========================
                let output = document.getElementById('output') // Make the statblock visible
                let outputDisplay = output.style.display
                console.log("Output Display:", outputDisplay)
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