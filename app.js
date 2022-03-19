// Function to sum an array
function sumArray(array){
    return array.reduce((partialSum, a) => partialSum + a, 0);
}
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
function test(){
    let cr = document.getElementById('chal-rating').value
    let avg = document.getElementById('average-value').value
    damageToDice(avg, cr)
}
// Function that takes an average value in that then spits out a dice combination or the closest 2 dice combos to the input average value
function damageToDice(AV, CR){
    // AV is the average value of the dice, I.E. the average damage: AV = ((M + 1)/2)*N
    // N is the number of dice: N = AV / ((M + 1)/2)	
    // M is the max value of one die: M = (AV / N)*2-1
    const diceSizes = [4, 6, 8, 10, 12, 20] // TODO: Take size into account (Tiny, Small, Medium, Large, Huge, Gargantuan)
    let output
    AV = parseFloat(AV)
    let addition = Math.round((CR / 0.20515) + 0.2192)
    AV = AV - addition
    function diceCombo(AV){
        let N = 1
        let M = ( ( AV / N ) * 2 ) - 1
        let av = ((M + 1)/2)*N
        // console.log({AV: AV, av: av})
        while (av != AV || !diceSizes.includes(M)) {
            N += 1
            M = ( ( AV / N ) * 2 ) - 1
            av = ((M + 1)/2)*N
            // console.log("N:", N)
            // console.log("M:", M)
            // console.log("av:", av)
            // console.log("--------------------")
            if (N >= 20) {
                break
            }
        }
        return {'M': M, 'N': N, 'AV': AV + addition, 'ADDITION': addition}
    }
    // Checks for a dice combo on the initial AV
    let actualDiceCombo = diceCombo(AV)
    // This outputs the neareast AVs, both below and above the input AV to allow the user to choose from, E.G. if the user inputs AV = 21.5, then the outputs will be AV 21 at 6d6 and AV 22 at 4d10
    if (actualDiceCombo.N >= 20 && !diceSizes.includes(actualDiceCombo.M)) {
        // Lower AV
        let lowerAV = AV - 0.5
        let lowerDiceCombo = diceCombo(lowerAV)
        while (!diceSizes.includes(lowerDiceCombo.M)) {
            lowerAV -= 0.5
            lowerDiceCombo = diceCombo(lowerAV)
        }
        addition += Math.round(AV - lowerAV)
        lowerDiceCombo.ADDITION = addition
        lowerDiceCombo.AV = lowerDiceCombo.AV + (Math.round(AV - lowerAV))
        // Upper AV
        // let upperAV = AV + 0.5
        // let upperDiceCombo = diceCombo(upperAV)
        // while (!diceSizes.includes(upperDiceCombo.M)) {
        //     upperAV += 0.5
        //     upperDiceCombo = diceCombo(upperAV)
        // }
        // console.log("Lower Dice Combo:", lowerDiceCombo)
        // console.log("Upper Dice Combo:", upperDiceCombo)
        // output = [lowerDiceCombo, upperDiceCombo]
        output = [lowerDiceCombo]
    } else {
        output = [actualDiceCombo]
        // console.log("Actual Dice Combo:", actualDiceCombo)
    }
    // console.log("OUTPUT:", output)
    // console.log("Addition:", addition)
    let str
    if (output.length == 1) {
        str = `${output[0]['N']}d${output[0]['M']} + ${output[0]['ADDITION']}`
    } else {
        str = `${output[0]['N']}d${output[0]['M']} + ${output[0]['ADDITION']} =  ${output[0]['AV']} or ${output[1]['N']}d${output[1]['M']} + ${output[1]['ADDITION']} =  ${output[1]['AV']}`
    }
    output.push(str)
    // console.log("String:", str)
    return output
}
// Function to addjust inputs based on the type of monster 
function monsterType(){
    let cr = document.getElementById('cr').value
    if (cr == 'select'){ 
        adjustCasterMartialElements('none', 'none', 'none')
        return
    }
    let type = document.querySelector('input[name="type"]:checked').value // Get the selected type from the Type Radio Group
    if (type == "caster") {
        adjustCasterMartialElements('block', 'none', 'block')
    } else if (type == "martial") {
        adjustCasterMartialElements('none', 'block', 'block')
    } else if (type == "hybrid") {
        adjustCasterMartialElements('block', 'block', 'block')
    }
}
// Function to change the visibility of User Inputs
function adjustCasterMartialElements(casterDisplay, martialDisplay, hybridDisplay){
    let casterElements = document.getElementsByName('caster') // Get all the caster elements
    let martialElements = document.getElementsByName('martial') // Get all the martial elements
    let hybridElements = document.querySelectorAll('div[name="hybrid"]') // Get all the hybrid elements
    casterElements.forEach(element => {
        element.style.display = casterDisplay
    });
    martialElements.forEach(element => {
        element.style.display = martialDisplay
    })
    hybridElements.forEach(element => {
      element.style.display = hybridDisplay
    });
}
// Function that is called when the CR is selected on the I Got This page
function iGotThisCRFunction(element) {
    monsterType()
    let cr = element.value
    if (cr == 'select') { return }
    let crText = element.options[element.selectedIndex].text
    // Points
    let points = ( cr * 5 ) + 8
    document.getElementById('points').innerHTML = `<b>${Math.round(points)}</b>`
    // Challenge Rating
    let xp = xpByCr.find(i => i.CR == cr).XP
    // Starting Purchasables
    let proficiencyBonus = rothnersChartV2.find(i => i.CR == cr)['Prof']
    let AC = rothnersChartV2.find(i => i.CR == cr)['Armor Class']
    let HP = rothnersChartV2.find(i => i.CR == cr)['Hit Points']
    let hitDice = damageToDice(HP, cr)[1]
    let saveSum = rothnersChartV2.find(i => i.CR == cr)['Sum D/C/W Save']
    let damagePerRound = rothnersChartV2.find(i => i.CR == cr)['Damage /Round']
    let toHitBonus = rothnersChartV2.find(i => i.CR == cr)['To Hit Bonus']
    let DC = rothnersChartV2.find(i => i.CR == cr)['DC']
    let spellToHit = rothnersChartV2.find(i => i.CR == cr)['Spell To Hit']
    let spellLevel = rothnersChartV2.find(i => i.CR == cr)['Spell Level']
    let effectiveSpellDamage = rothnersChartV2.find(i => i.CR == cr)['Effective Spell Dmg']

    document.getElementById('challenge-rating').innerText = `${crText} (${xp.toLocaleString()} XP)`
    document.getElementById('proficiency_bonus').innerText = `+${proficiencyBonus}`
    document.getElementById('armor-class').innerText = AC
    document.getElementById('armor-class-input').value = AC
    document.getElementById('hit-points').innerText = `${HP} (${hitDice})`
    document.getElementById('hit-points-input').value = HP
    document.getElementById('to-hit-and-dc-bonus').value = `+${toHitBonus}`
    document.getElementById('damage-per-round').value = damagePerRound
    document.getElementById('spell-save-dc').value = DC
    document.getElementById('spell-to-hit').value = `+${spellToHit}`
    document.getElementById('spell-level').value = spellLevel
    document.getElementById('spell-damage').value = effectiveSpellDamage
    document.getElementById('save-sum').value = saveSum
}
// Function to randomly generate a monster based on user inputs
function generateMonster(method){
    let monster = {} // Set up the JSON to write the data to
    // =========================
    //     Challenge Rating
    // =========================
    if (method == 'random-cr') {
        let cr = document.getElementById('cr').value // Step 1: Select CR

    } 
    // =========================
    //          Party
    // =========================
    else if (method == 'random-party') {

    } 
    // =========================
    //        I Got This
    // =========================
    else if (method == 'i-got-this') {
        let cr = document.getElementById('cr').value // Step 1: Select CR
        
    } 
    // =========================
    //        Walkthrough
    // =========================
    else if (method == 'walkthrough') {
        let cr = document.getElementById('cr').value // Step 1: Select CR
        
    }
    return monster // Return the JSON
}
// This function builds a statblock for the monster that is passed through using Statblock5e
// Source: http://valloric.github.io/statblock5e/
function buildStatblock5e(monster){
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
        const points = (cr * 5) + 8
        if (cr == 'select') { 
            alert('Please select a CR!') 
            return
        }
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

// Function to pull a randomly selected monster from Open5e and display it in Statblock5e
// Will not be useful soon, as it was just practice
function generateMonsterFromOpen5e(){
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
        const points = (cr * 5) + 8
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