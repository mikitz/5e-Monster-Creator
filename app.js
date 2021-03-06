// ================
//    Math Stuff
// ================
// Function that takes an average value in that then spits out a dice combination or the closest 2 dice combos to the input average value
function damageToDice(AV, CR){
    let output
    if (AV == 16) {
        output = [
            "blah",
            `4d6 + 2`
        ]
        return output
    } 
    
    if (AV == 7) {
        output = [
            "blah",
            `1d6 + 1`
        ]
        return output
    }
    // AV is the average value of the dice, E.G. the average damage: AV = ((M + 1)/2)*N
    // N is the number of dice: N = AV / ((M + 1)/2)	
    // M is the max value of one die: M = (AV / N)*2-1
    const diceSizes = [4, 6, 8, 10, 12, 20] // TODO: Take size into account (Tiny, Small, Medium, Large, Huge, Gargantuan)
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
        // output = [lowerDiceCombo, upperDiceCombo]
        output = [lowerDiceCombo]
    } else {
        output = [actualDiceCombo]
    }
    let str
    if (output.length == 1) {
        str = `${output[0]['N']}d${output[0]['M']} + ${output[0]['ADDITION']}`
    } else {
        str = `${output[0]['N']}d${output[0]['M']} + ${output[0]['ADDITION']} =  ${output[0]['AV']} or ${output[1]['N']}d${output[1]['M']} + ${output[1]['ADDITION']} =  ${output[1]['AV']}`
    }
    output.push(str)
    return output
}
// ===============
//    Adjust UI
// ===============
// Function to set the theme
function setTheme() {
    const theme = localStorage.getItem('theme')
    if (theme) {
        localStorage.setItem('theme', theme)
        document.getElementById('theme-css').setAttribute('href', `css/${theme}.css`)
    } else {
        localStorage.setItem('theme', 'light')
    }
}
// Function to populate the creator div
function populateCreator(){
    let method = getSelectedValueFromRadioGroup('method', 'value') // Get the selected method
    let creator = document.getElementById('creator') // Get the creator element that gets populated with the proper HTML
    $(creator).load(`html_templates/${method}.html`) // Populate the innerHTML based on the selected method
}
// Function to update the instructions
function updateInstructions(){
    let selectedMethod = getSelectedValueFromRadioGroup('method', 'id')
    let instructions = document.getElementById('instructions')
    if (selectedMethod == 'Pre_Gens') { instructions.innerHTML = `Start from a baseline determined by CR, then reduce the below inputs to gain additional points that can be spent anywhere else. Click on the elements in the statblock to edit them.` }
    else if (selectedMethod == 'I_Got_This!') { instructions.innerHTML = `Start by selecting a CR, which determines how many points you have to spend, then spend them to your heart's content! Click on the elements in the statblock to edit them.` }
}
// Function to populate the generator div
function populateGenerator(){
    let method = getSelectedValueFromRadioGroup('generation-method', 'value') // Get the selected method
    let creator = document.getElementById('generator') // Get the creator element that gets populated with the proper HTML
    $(creator).load(`html_templates/random_generator_templates/${method}.html`) // Populate the innerHTML based on the selected method
}
// Function to adjust inputs based on the type of monster 
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
// ==============================
//   Local Storage Manipulation
// ==============================
// Load Local Storage Creature
function loadLocalStorageMonster(){
    const monsterData = JSON.parse(localStorage.getItem('monster_data'))
    // Update Statblock
    buildStatblock(monsterData)
}
// Save Monster Statblock to Local Storage
function saveMonsterInputsToLocalStorage(){
    const monsterData = JSON.parse(localStorage.getItem('monster_data'))
    // Inputs
    const ac = parseInt(document.getElementById('armor-class-input').value)
    const hp = document.getElementById('hit-points-statblock').value
    const meleeToHit = parseInt((document.getElementById('to-hit-input').value).replace("+", ""))
    const damagePerRound = parseInt(document.getElementById('damage-per-round-input').value)
    const spellSaveDC = parseInt(document.getElementById('spell-save-dc-input').value)
    const spellToHit = parseInt((document.getElementById('spell-to-hit-input').value).replace("+", ""))
    const dexConWis = parseInt(document.getElementById('save-sum-input').value)
    const spellLevel = parseInt(document.getElementById('spell-level-input').value)
    const effectiveSpellDamage = parseInt(document.getElementById('spell-damage-input').value)
    // Update JSON
    monsterData.armor_class = ac
    monsterData.hit_points = hp
    monsterData.melee_to_hit = meleeToHit
    monsterData.damage_per_round = damagePerRound
    monsterData.spell_save_dc = spellSaveDC
    monsterData.spell_to_hit = spellToHit
    monsterData.dex_con_wis = dexConWis
    monsterData.spell_level = spellLevel
    monsterData.effective_spell_damage = effectiveSpellDamage
    // Local Storage Update
    localStorage.setItem('monster_data', JSON.stringify(monsterData))
}
// ========================
//     Export Statblock
// ========================
// Function to download the statblock as a jpg
function downloadStatblockAsImage() {
    const name = document.getElementById('monster-name-statblock').innerText
    domtoimage.toBlob(document.getElementById('output')) // TODO: This renders a transparent background with red text and cannot load two fonts
        .then(function (blob) {
            window.saveAs(blob, `(Statblock) ${name}.png`);
        });
}
// Function to download for a FoundryVTT Import
function downloadFoundryVtt() {
    
}
// Function to download a JSON for import into Fantasy Grounds
function downloadFantasyGrounds() {

}
// =====================
//   Update Statblock
// =====================
// Function to parse a JSON and updating it in the statblock
function loadJSONAndUpdateStatblock(data, elementID){
    try {
        dataList = eval(elementID.replace("-statblock", ""))
        let stringFinal = []
        document.getElementById(elementID).innerText = ''
        for (let index = 0; index < dataList.length; index++) {
            const element = dataList[index];
            if (data[index] == 0) continue
            stringFinal.push(`${element} ${data[index]} ft.`)
        }
        document.getElementById(elementID).innerText = stringFinal.join(", ")
    }
    catch(e) { console.error("loadJSONAndUpdateStatblock() ~~ ", e) }
    
}
// Function to parse an array and updating the Statblock
function loadArrayAndUpdateStatblock(data, elementID){
    try {
        let stringFinal = []
        data.forEach(element => {
            stringFinal.push(element)
        });
        document.getElementById(elementID).innerText = stringFinal.join("; ")
    } 
    catch(e) { console.error("loadArrayAndUpdateStatblock() ~~ ", e) }
    
}
// Function to parse a string and updating the Statblock
function loadStringAndUpdateStatblock(data, elementID){
    try { 
        document.getElementById(elementID).innerText = data
    }
    catch(e) { console.error("loadStringAndUpdateStatblock() ~~ ", e) }
    
}
// Function that builds a statblock from a JSON
function buildStatblock(json){
    try {
        loadStringAndUpdateStatblock(json.name, 'monster-name-statblock') // Name
        loadStringAndUpdateStatblock(json.properties, 'monster-properties-statblock') // Properties
        loadJSONAndUpdateStatblock(json.speed, 'speeds-statblock') // Speed
        loadArrayAndUpdateStatblock(json.saving_throws, 'saving_throws-statblock') // Saving Throws
        loadArrayAndUpdateStatblock(json.skills, 'skills-statblock') // Skills
        loadArrayAndUpdateStatblock(json.damage_immunities, 'damage_immunities-statblock') // Damage Immunities
        loadArrayAndUpdateStatblock(json.damage_resistances, 'damage_resistances-statblock') // Damage Resistances
        loadArrayAndUpdateStatblock(json.damage_vulnerabilities, 'damage_vulnerabilities-statblock') // Damage Vulnerabilities
        loadArrayAndUpdateStatblock(json.conditions, 'condition_immunities-statblock') // Condition Immunities
        loadJSONAndUpdateStatblock(json.senses, 'senses-statblock') // Senses
        loadArrayAndUpdateStatblock(json.languages, 'languages-statblock') // Languages
        loadStringAndUpdateStatblock(json.challenge_rating, 'challenge-rating-statblock') // CR
        loadStringAndUpdateStatblock(json.hit_points, 'hit-points-statblock')// HP
        loadStringAndUpdateStatblock(json.proficiency_bonus, 'proficiency_bonus-statblock') // Proficiency Bonus
        loadStringAndUpdateStatblock(json.armor_class, 'armor-class-statblock') // Armor Class
        // TODO: Actions
        // TODO: Legenedary Actions
        // Abilities
        const abilitiesDiv = document.getElementById('abilities-statblock')
        abilitiesDiv.innerHTML = `<abilities-block data-cha="${json.ability_scores.cha}" data-con="${json.ability_scores.con}" data-dex="${json.ability_scores.dex}" data-int="${json.ability_scores.int}" data-str="${json.ability_scores.str}" data-wis="${json.ability_scores.wis}"></abilities-block>`
    } catch(error) { console.error("buildStatblock() ~~", error) }
    
}
// =====================
//     Build Monster
// =====================
// Function that is called when the CR is selected on the I Got This page
function iGotThisCRFunction(element) {
    monsterType()
    // Challenge Rating - Part 1
    let cr = element.value
    if (cr == 'select') return 
    let crText = element.options[element.selectedIndex].text
    // Get elements
    const selectedMethod = getSelectedValueFromRadioGroup('method', 'id')
    const elementPoints = document.getElementById('points')
    const elementCR = document.getElementById('challenge-rating-statblock')
    const elementProfBonus = document.getElementById('proficiency_bonus-statblock')
    const elementAC = document.getElementById('armor-class-statblock')
    const elementACinput = document.getElementById('armor-class-input')
    const elementHitDice = document.getElementById('hit-points-statblock')
    const elementHPinput = document.getElementById('hit-points-input')
    const elementToHit = document.getElementById('to-hit-input')
    const elementDMG = document.getElementById('damage-per-round-input')
    const elementSpellSaveDC = document.getElementById('spell-save-dc-input')
    const elementSpellToHit = document.getElementById('spell-to-hit-input')
    const elementSpellLevel = document.getElementById('spell-level-input')
    const elementSpellDamage = document.getElementById('spell-damage-input')
    const elementSaveSum = document.getElementById('save-sum-input')
    const elementName = document.getElementById('monster-name-statblock')
    // Points
    let points = ( cr * 5 ) + 8
    let prevCR = localStorage.getItem('CR')
    // =================================================
    //   Handle user changing CR after spending points
    // =================================================
    if (selectedMethod == "Pre_Gens"){

    } else if (selectedMethod == 'I_Got_This!') {
        let userPoints = parseInt(elementPoints.innerText)
        if (prevCR && userPoints >= 0) {
            let previousPoints = ( prevCR * 5 ) + 8
            if (points > previousPoints) {
                let differenceBetweenPointsAndPrevPoints = points - previousPoints
                elementPoints.innerText = userPoints + differenceBetweenPointsAndPrevPoints
            }
        }
    }
    // Challenge Rating - Part 2
    localStorage.setItem("CR", parseInt(cr))
    // ====================================
    //   Handling the two similar methods
    // ====================================
    // Challenge Rating
    const xp = xpByCr.find(i => i.CR == cr).XP
    // Starting Purchasables
    const proficiencyBonus = rothnersChartV2.find(i => i.CR == cr)['Prof']
    const AC = rothnersChartV2.find(i => i.CR == cr)['Armor Class']
    const HP = rothnersChartV2.find(i => i.CR == cr)['Hit Points']
    const hitDice = damageToDice(HP, cr)[1]
    const saveSum = rothnersChartV2.find(i => i.CR == cr)['Sum D/C/W Save']
    const damagePerRound = rothnersChartV2.find(i => i.CR == cr)['Damage /Round']
    const toHitBonus = rothnersChartV2.find(i => i.CR == cr)['To Hit Bonus']
    const DC = rothnersChartV2.find(i => i.CR == cr)['DC']
    const spellToHit = rothnersChartV2.find(i => i.CR == cr)['Spell To Hit']
    const spellLevel = rothnersChartV2.find(i => i.CR == cr)['Spell Level']
    const effectiveSpellDamage = rothnersChartV2.find(i => i.CR == cr)['Effective Spell Dmg']

    const monsterData = JSON.parse(localStorage.getItem('monster_data'))

    if (selectedMethod == 'Pre_Gens') {
        elementPoints.innerHTML = 0
        elementAC.innerText = AC
        elementACinput.value = AC
        elementHitDice.innerText = `${HP} (${hitDice})`
        elementHPinput.value = HP
        elementToHit.value = `+${toHitBonus}`
        elementDMG.value = damagePerRound
        elementSpellSaveDC.value = DC
        elementSpellToHit.value = `+${spellToHit}`
        elementSpellLevel.value = spellLevel
        elementSaveSum.value = saveSum

        // Save to Monster Data
        monsterData.challenge_rating = `${crText} (${xp.toLocaleString()} XP)`
        monsterData.hit_points = `${HP} (${hitDice})`
        monsterData.armor_class = AC
        monsterData.proficiency_bonus = proficiencyBonus
        
        // localStorage.setItem('hp', `${HP} (${hitDice})`)
        // localStorage.setItem('ac', AC)
        // localStorage.setItem('proficiency-bonus', `+${proficiencyBonus}`)
    } else {
        elementPoints.innerHTML = `<b>${Math.round((cr * 5)+6)}</b>`
        elementAC.innerText = 11
        elementACinput.value = 11
        elementHitDice.innerText = `8 (TBD)`
        elementHPinput.value = 8
        elementToHit.value = 3
        elementDMG.value = 3
        elementSpellSaveDC.value = 10
        elementSpellToHit.value = 2
        elementSaveSum.value = 1

        // Save to Monster Data
        monsterData.challenge_rating = `${crText} (${xp.toLocaleString()} XP)`
        monsterData.hit_points = `8 (TBD)`
        monsterData.armor_class = 11
        monsterData.proficiency_bonus = proficiencyBonus
        // localStorage.setItem('hp', `8 (TBD)`)
        // localStorage.setItem('ac', 11)
        // localStorage.setItem('proficiency-bonus', `+${proficiencyBonus}`)
    }
    elementCR.innerText = `${crText} (${xp.toLocaleString()} XP)`
    elementProfBonus.innerText = `+${proficiencyBonus}`
    elementSpellLevel.value = spellLevel
    elementSpellDamage.value = effectiveSpellDamage
    elementName.innerText = 'Name'
    // Update Local Storage
    localStorage.setItem('cr', `${crText} (${xp.toLocaleString()} XP)`)
    localStorage.setItem('monster_data', JSON.stringify(monsterData))

}
// Function to randomly generate a monster based on user inputs
async function generateRandomMonster(method){
    let data = {}
    // =========================
    //     Challenge Rating
    // =========================
    if (method == 'random-cr') {
        // User Inputs
        let cr = parseFloat(document.getElementById('cr').value) // Get the CR
        const xp = xpByCr.find(i => i.CR == cr).XP // Get the XP
            if (cr < 1 && cr != 0) { 
                const fraction = math.fraction(cr)
                cr = `${fraction.n}/${fraction.d}`
            }
        const role = document.querySelector(`input[name="method"]:checked`).value // Get the Role
        
        // -----------------------------------------
        //   Randomly Determine Monster Parameters
        // -----------------------------------------
        // Functions
        async function randomSpeed(){ // Function to randomly give the monster some movement speed
            /* 
                Probabilities: 
                    Fly: 457 / 2909 = 0.1567 -- (2d5) * 10
                    Climb: 230 / 2909 = 0.0791 -- (2d3 - 1) * 10
                    Swim: 297 / 2909 = 0.1021 -- (2d5) * 10
                    Walk: 2250 / 2909 = 0.7735 -- (2d3 - 1) * 10
                    Burrow: 100 / 2909 = 0.0344 -- (2d3 - 1) * 10
            */
            let fly
            let climb
            let swim
            let walk
            let burrow
            let speedList = []

            if (roll('1d10000').total <= 1567) fly = roll('2d5*10').total
            if (roll('1d10000').total <= 791) climb = roll('2d3-1*10').total
            if (roll('1d10000').total <= 1021) swim = roll('2d5*10').total
            if (roll('1d10000').total <= 344) burrow = roll('2d3-1*10').total
            if (roll('1d10000').total <= 7735) walk = roll('2d3-1*10').total

            if (burrow) speedList.push(burrow)
            else speedList.push(0)
            if (climb) speedList.push(climb)
            else speedList.push(0)
            if (fly) speedList.push(fly)
            else speedList.push(0)
            if (swim) speedList.push(swim)
            else speedList.push(0)

            const sum = speedList.reduce((partialSum, a) => partialSum + a, 0);
            if (walk || sum == 0) speedList.push(walk) // Add walk if there are no other speeds or if walk should be added
            else speedList.push(0)

            return speedList
        }
        async function randomArray(arrayName, dependency){ // Function to randomly create a list based on the length of the given array
            const quantity = roll(`1d${arrayName.length}`).total // Roll a die equal to the array's length
            const array = [] // Define the array that will be returned
            for (let index = 0; index < quantity; index++) { // Loop through the quantity determined above
                let item = randomProperty(arrayName) // Get a random item from the given array
                while (array.includes(item)) item = randomProperty(arrayName) // If the item is already in the list, get another random item
                array.push(item) // Push the item to the list
            }
            return array
        }
        async function randomSenses(){
            const monsterSenses = await randomArray(senses) // Get a random list of senses
            let sensesAndDistance = []
            senses.forEach(element => { // Loop through them all to determine the distance
                const range = roll('2d3-1*10').total
                if (monsterSenses.includes(element)) sensesAndDistance.push(`${range}`)
                else sensesAndDistance.push("0")
            });
            return sensesAndDistance
        }
        async function randomDamageTypeVariables(){
            const damageImmunities = await randomArray(damageTypes)
            // Damage Resistances
            const drQuantity = roll(`1d${damageTypes.length}`).total
            const damageResistances = []
            for (let index = 0; index < drQuantity; index++) {
                let broken
                let item = randomProperty(damageTypes)
                let counter = 1
                while (damageResistances.includes(item) || damageImmunities.includes(item)) {
                    counter += 1
                    if (counter >= damageTypes.length) {
                        broken = true
                        break
                    }
                    item = randomProperty(damageTypes)
                }
                if (!broken) damageResistances.push(item)
            }
            // Damage Vulnerabiiltes
            const dvQuantity = roll(`1d${damageTypes.length}`).total
            const damageVulnerabilities = []
            for (let index = 0; index < dvQuantity; index++) {
                let broken
                let item = randomProperty(damageTypes)
                let counter = 1
                while (damageResistances.includes(item) || damageImmunities.includes(item) || damageVulnerabilities.includes(item)) {
                    counter += 1
                    if (counter >= damageTypes.length) {
                        broken = true
                        break
                    }
                    item = randomProperty(damageTypes)
                }
                if (!broken) damageVulnerabilities.push(item)
            }
            return {damage_immunities: damageImmunities, damage_resistances: damageResistances, damage_vulnerabilities: damageVulnerabilities}
        }
        async function randomAbilityScores(){
            let abilityScores = {
                str: roll('2d6+6').total,
                dex: roll('2d6+6').total,
                con: roll('2d6+6').total,
                int: roll('2d6+6').total,
                wis: roll('2d6+6').total,
                cha: roll('2d6+6').total
            }
            return abilityScores
        }

        let name = 'name'
        let properties = `${randomProperty(sizes)} ${randomProperty(monsterTypes)}, ${randomProperty(alignments)} (${role})` // Properties
        let speed = await randomSpeed()
        let abilityScores = await randomAbilityScores()
        let profBonus = `+${rothnersChartV2.find(i => i.CR == cr)['Prof']}`
        let savingThrows = await randomArray(abilities)
        let monsterSkills = await randomArray(skills)
        const damageVariables = await randomDamageTypeVariables()
        let damageImmunities = damageVariables.damage_immunities
        let damageResistances = damageVariables.damage_resistances
        let damageVulnerabilities = damageVariables.damage_vulnerabilities
        let monsterConditions = await randomArray(conditions)
        let monsterSenses = await randomSenses()
        let monsterLanguages = await randomArray(languages)
        let hp = rothnersChartV2.find(i => i.CR == cr)['Hit Points']
        let hpStuff = damageToDice(hp, cr)
        hp = roll(hpStuff[1].replaceAll(" ", "")).total
        let hitDice = hpStuff[1] 
        let ac = rothnersChartV2.find(i => i.CR == cr)['Armor Class']
          
        // Build JSON
        data = {
            name: name,
            properties: properties,
            speed: speed,
            ability_scores: abilityScores,
            saving_throws: savingThrows,
            skills: monsterSkills,
            damage_immunities: damageImmunities,
            damage_resistances: damageResistances,
            damage_vulnerabilities: damageVulnerabilities,
            conditions: monsterConditions,
            senses: monsterSenses,
            languages: monsterLanguages,
            challenge_rating: `${cr} (${xp.toLocaleString()} XP)`,
            hit_points: `${hp} (${hitDice})`,
            proficiency_bonus: profBonus,
            armor_class: ac,
            role: role,
            actions: [],
            legendary_actions: [],
            spells: []
        }
        // LOCAL STORAGE UPDATE
        localStorage.setItem('monster_data', JSON.stringify(data))
    } 
    // =========================
    //          Party
    // =========================
    else if (method == 'random-party') {
        // Monster Parameters
        let name
        let properties
        let speed
        let savingThrows
        let monsterSkills
        let damageImmunities
        let damageResistances
        let damageVulnerabilities
        let monsterConditions
        let monsterSenses
        let monsterLanguages
        let hp
        let profBonus
        let ac
        // Randomly Determine the above parameters
        
        // Bulid JSON
        data = {
            name: name,
            properties: properties,
            speed: speed,
            ability_scores: abilityScores,
            saving_throws: savingThrows,
            skills: monsterSkills,
            damage_immunities: damageImmunities,
            damage_resistances: damageResistances,
            damage_vulnerabilities: damageVulnerabilities,
            conditions: monsterConditions,
            senses: monsterSenses,
            languages: monsterLanguages,
            challenge_rating: `${cr} (${xp.toLocaleString()} XP)`,
            hit_points: `${hp} (${hitDice})`,
            proficiency_bonus: profBonus,
            armor_class: ac,
            role: role,
            actions: [],
            legendary_actions: [],
            spells: []
        }
    } 
    
    // UPDATE DOM
    $(document.getElementById('statblock')).load("html_templates/statblocks/statblock.html")
    sleep(500).then(() => {
        buildStatblock(data) // Populate the statblock
        randomStatblockListeners() // Add listeners and Tippy to the newly created statblock
    })
}