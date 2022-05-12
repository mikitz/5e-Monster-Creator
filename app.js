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
    // Local Storage
    const name = localStorage.getItem('name')
    const properties = localStorage.getItem('properties')
    const speed = JSON.parse(localStorage.getItem('speed'))
    const savingThrows = JSON.parse(localStorage.getItem('saving-throws'))
    const skills = JSON.parse(localStorage.getItem('skills'))
    const damageImmunities = JSON.parse(localStorage.getItem('damage-immunities'))
    const damageResistances = JSON.parse(localStorage.getItem('damage-resistances'))
    const damageVulnerabilities =JSON.parse( localStorage.getItem('damage-vulnerabilities'))
    const conditions = JSON.parse(localStorage.getItem('conditions'))
    const senses = JSON.parse(localStorage.getItem('senses'))
    const languages = JSON.parse(localStorage.getItem('languages'))
    const cr = localStorage.getItem('cr')
    const hp = localStorage.getItem('hp')
    const profBonus = localStorage.getItem('proficiency-bonus')
    const ac = localStorage.getItem('ac')
    const str = localStorage.getItem('strength')
    const dex = localStorage.getItem('dexterity')
    const con = localStorage.getItem('constitution')
    const wis = localStorage.getItem('wisdom')
    const int = localStorage.getItem('intelligence')
    const cha = localStorage.getItem('charisma')
    // Build JSON
    const json = {
        name: name,
        properties: properties,
        speed: speed,
        abilities: abilities,
        saving_throws: savingThrows,
        skills: skills,
        damage_immunities: damageImmunities,
        damage_resistances: damageResistances,
        damage_vulnerabilities: damageVulnerabilities,
        conditions: conditions,
        senses: senses,
        languages: languages,
        challenge_rating: cr,
        hit_points: hp,
        proficiency_bonus: profBonus,
        armor_class: ac,
        str: str,
        dex: dex,
        con: con,
        int: int,
        wis: wis,
        cha: cha,
    }
    // Update Statblock
    buildStatblock(json)
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
    catch(e) { console.error(e) }
    
}
// Function to parse an array and updating the Statblock
function loadArrayAndUpdateStatblock(data, elementID){
    try {
        let stringFinal = []
        data.forEach(element => {
            stringFinal.push(element)
        });
        document.getElementById(elementID).innerText = stringFinal.join(", ")
    } 
    catch(e) { console.error(e) }
    
}
// Function to parse a string and updating the Statblock
function loadStringAndUpdateStatblock(data, elementID){
    try { 
        document.getElementById(elementID).innerText = data
    }
    catch(e) { console.error(e) }
    
}
// Function that builds a statblock from a JSON
function buildStatblock(json){
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
    abilitiesDiv.innerHTML = `<abilities-block data-cha="${json.cha}" data-con="${json.con}" data-dex="${json.dex}" data-int="${json.int}" data-str="${json.str}" data-wis="${json.wis}"></abilities-block>`
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

        // Save to LocalStorage
        localStorage.setItem('cr', `${crText} (${xp.toLocaleString()} XP)`)
        localStorage.setItem('hp', `${HP} (${hitDice})`)
        localStorage.setItem('ac', AC)
        localStorage.setItem('proficiency-bonus', `+${proficiencyBonus}`)
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

        // Save to LocalStorage
        localStorage.setItem('cr', `${crText} (${xp.toLocaleString()} XP)`)
        localStorage.setItem('hp', `8 (TBD)`)
        localStorage.setItem('ac', 11)
        localStorage.setItem('proficiency-bonus', `+${proficiencyBonus}`)
    }
    elementCR.innerText = `${crText} (${xp.toLocaleString()} XP)`
    elementProfBonus.innerText = `+${proficiencyBonus}`
    elementSpellLevel.value = spellLevel
    elementSpellDamage.value = effectiveSpellDamage
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
        
        // ---------------------------------------
        // Randomly Determine the above parameters
        // ---------------------------------------
        // Functions
        async function randomSpeed(){ // Function to randomly give the monster some movement speed
            /* 
                Probs: 
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

            if (roll('1d10000') <= 1567) fly = roll('2d5 * 10')
            if (roll('1d10000') <= 791) climb = roll('2d3 - 1 * 10')
            if (roll('1d10000') <= 1021) swim = roll('2d5 * 10')
            if (roll('1d10000') <= 344) burrow = roll('2d3 - 1 * 10')
            if (roll('1d10000') <= 7735) walk = roll('2d3 - 1 * 10')

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
        async function randomSavingThrows(role){ // Function to randomly generate saving throw proficiencies based on cr
            let weakSave = randomProperty(abilities)
            while (weakSave == 'wisdom' || weakSave == 'dexterity' || weakSave == 'constitution'){
                weakSave = randomProperty(abilities)
            }
            let strongSave = randomProperty(abilities)
            while (strongSave == 'charisma' || strongSave == 'intelligence' || strongSave == 'strength'){
                strongSave = randomProperty(abilities)
            }
            return {weak_save: weakSave, strong_save: strongSave}
        }
        let name = 'name'
        let properties = `${randomProperty(sizes)} ${randomProperty(monsterTypes)}, ${randomProperty(alignments)} (${role})` // Properties
        let speed = await randomSpeed()
        let abilities
        let profBonus = `+${rothnersChartV2.find(i => i.CR == cr)['Prof']}`
        let savingThrows = await randomSavingThrows(role)
            let weakSave = savingThrows.weak_save
            let strongSave = savingThrows.strong_save
        let skills
        let damageImmunities
        let damageResistances
        let damageVulnerabilities
        let conditions
        let senses
        let languages
        let hp = rothnersChartV2.find(i => i.CR == cr)['Hit Points']
            hp = roll(damageToDice(hp, cr))
        let ac = rothnersChartV2.find(i => i.CR == cr)['Armor Class']
        let hitDice = damageToDice(hp, cr)[1]     
        
        // Bulid JSON
        data = {
            name: name,
            properties: properties,
            speed: speed,
            abilities: abilities,
            saving_throws: savingThrows,
            skills: skills,
            damage_immunities: damageImmunities,
            damage_resistances: damageResistances,
            damage_vulnerabilities: damageVulnerabilities,
            conditions: conditions,
            senses: senses,
            languages: languages,
            challenge_rating: `${cr} (${xp.toLocaleString()} XP)`,
            hit_points: `${hp} (${hitDice})`,
            proficiency_bonus: profBonus,
            armor_class: ac,
            role: role
        }
        console.log("Data", data)
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
        let skills
        let damageImmunities
        let damageResistances
        let damageVulnerabilities
        let conditions
        let senses
        let languages
        let hp
        let profBonus
        let ac
        // Randomly Determine the above parameters
        
        // Bulid JSON
        data = {
            name: name,
            properties: properties,
            speed: speed,
            saving_throws: savingThrows,
            skills: skills,
            damage_immunities: damageImmunities,
            damage_resistances: damageResistances,
            damage_vulnerabilities: damageVulnerabilities,
            conditions: conditions,
            senses: senses,
            languages: languages,
            challenge_rating: cr,
            hit_points: hp,
            proficiency_bonus: profBonus,
            armor_class: ac
        }
    } 
    $(document.getElementById('statblock')).load("html_templates/statblocks/statblock.html")
    sleep(500).then(() => {
        buildStatblock(data) // Populate the statblock
        randomStatblockListeners() // Add listeners and Tippy to the newly created statblock
    })
    
}