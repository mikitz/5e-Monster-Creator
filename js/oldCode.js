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