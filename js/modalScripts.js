// Saving Throws, Skills, Condition Immunities, and Languages
function populateModal(monsterParameter){
    const div = document.getElementById(`${monsterParameter}-checkboxes`)
    const underscored = monsterParameter.replace("-", "_")
    const selected = JSON.parse(localStorage.getItem(`monster_data`))[underscored]
    let table

    if (monsterParameter == 'saving-throws') table = abilities
    else if (monsterParameter == 'languages') table = languages
    else if (monsterParameter == 'conditions') table = conditions
    else if (monsterParameter == 'skills') table = skills

    table.forEach(element => {
        const span = document.createElement('span')
        span.classList.add('modal-flex-element')

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.name = monsterParameter
        input.id = `${element}-checkbox`
        input.value = element
        input.style.marginRight = '5px'
        if (selected && selected.includes(element)) input.checked = true
        span.appendChild(input)

        const label = document.createElement('label')
        label.innerText = capitalize(element)
        label.setAttribute('for', `${element}-checkbox`)
        label.style.overflow = 'ellipsis'

        if (element == "bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered") {
            label.innerText = "non-silvered"
            label.id = "non-silvered-label"
            label.classList.add("help")
        }
        if (element == "bludgeoning, piercing, and slashing from nonmagical attacks") {
            label.innerText = "non-magical"
            label.id = "non-magical-label"
            label.classList.add("help")
        }

        span.appendChild(label)
        
        div.appendChild(span)
    })
}
function modalListeners(monsterParameter){
    const radioGroups = document.getElementsByName(monsterParameter)
    const underscored = monsterParameter.replace("-", "_")
    let selected = []
    radioGroups.forEach(element => {
        element.addEventListener('change', function(){
            const selectedTypes = document.querySelectorAll(`input[name="${monsterParameter}"]:checked`)
            selected = Array.from(selectedTypes).map(x => x.value)
            const stringList = selected.join("; ")
            document.getElementById(`${underscored}-statblock`).innerText = stringList
            const monsterData = JSON.parse(localStorage.getItem('monster_data'))
            monsterData[underscored] = selected
            localStorage.setItem('monster_data', JSON.stringify(monsterData))
        })
    })
}
// Monster Name
function monsterNameListeners(){
    const input = document.getElementById('input')
    input.addEventListener('input', function(){
        saveMonsterData('name', this.value)
        document.getElementById('monster-name-statblock').innerText = this.value
    })
}
// Monster Properties
function monsterProperties() {
    // Elements
    const size = document.getElementById('size-radio-div')
    const type = document.getElementById('type-radio-div')
    const alignment = document.getElementById('alignment-radio-div')
    const lastDiv = document.getElementById('last-div')
    const properties = JSON.parse(localStorage.getItem('monster_data')).properties
    // Sizes
    sizes.forEach(element => {
        const label = document.createElement('label')
        label.id = `${element}-label`

        const input = document.createElement('input')
        input.classList.add('checkbox')
        input.type = 'radio'
        input.name = 'radio-size'
        input.id = `${element}-radio`
        input.value = element
        if (properties && properties.indexOf(element) !== -1) input.checked = true
        else if (!properties) input.checked = true
        label.appendChild(input)

        const span = document.createElement('span')
        span.innerText = element
        span.style.textTransform = 'capitalize'
        label.appendChild(span)

        size.appendChild(label)
    })
    // Types
    monsterTypes.forEach(element => {
        const label = document.createElement('label')
        label.id = `${element}-label`

        const input = document.createElement('input')
        input.classList.add('checkbox')
        input.type = 'radio'
        input.name = 'radio-monster-type'
        input.id = `${element}-radio`
        input.value = element
        if (properties && properties.indexOf(element) !== -1) input.checked = true
        else if (!properties) input.checked = true
        label.appendChild(input)

        const span = document.createElement('span')
        span.innerText = element
        span.style.textTransform = 'capitalize'
        label.appendChild(span)

        type.appendChild(label)
    })
    // Alignments
    alignments.forEach(element => {
        const label = document.createElement('label')
        label.id = `${element}-label`

        const input = document.createElement('input')
        input.classList.add('checkbox')
        input.type = 'radio'
        input.name = 'radio-alignment'
        input.id = `${element}-radio`
        input.value = element
        if (properties && properties.indexOf(element) !== -1) input.checked = true
        else if (!properties) input.checked = true
        label.appendChild(input)

        const span = document.createElement('span')
        span.innerText = element
        span.style.textTransform = 'capitalize'
        label.appendChild(span)

        alignment.appendChild(label)
    })
}
function monsterPropertiesListeners() {
    const radioGroups = document.getElementsByName('monster-property-radio-group')
    radioGroups.forEach(element => {
        element.addEventListener('change', function(){
            // Get Checked Elements
            const size = document.querySelector('input[name="radio-size"]:checked').value
            const type = document.querySelector('input[name="radio-monster-type"]:checked').value
            const alignment = document.querySelector('input[name="radio-alignment"]:checked').value
            // Set the string
            const propString = `${capitalize(size)} ${type}, ${alignment}`
            document.getElementById('monster-properties-statblock').innerText = propString
            const monsterData = JSON.parse(localStorage.getItem('monster_data'))
            monsterData.properties = propString
            localStorage.setItem('monster_data', JSON.stringify(monsterData))
        })
    })
}
// Abilities
function monsterAbilities(){
    addTippy('strength-info', 'Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.')
    addTippy('dexterity-info', "Dexterity measures agility, reflexes, and balance.")
    addTippy('constitution-info', "Constitution measures health, stamina, and vital force.")
    addTippy('intelligence-info', "Intelligence measures mental acuity, accuracy of recall, and the ability to reason.")
    addTippy('wisdom-info', "Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.")
    addTippy('charisma-info', "Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality.")

    const monsterData = JSON.parse(localStorage.getItem('monster_data'))
    console.log(monsterData.ability_scores)
    let str = monsterData.ability_scores.str
    let dex = monsterData.ability_scores.dex
    let con = monsterData.ability_scores.con
    let int = monsterData.ability_scores.int
    let wis = monsterData.ability_scores.wis
    let cha = monsterData.ability_scores.cha

    if (!str) str = 1
    if (!dex) dex = 1
    if (!con) con = 1
    if (!int) int = 1
    if (!wis) wis = 1
    if (!cha) cha = 1

    const strInput = document.getElementById('strength-input')
    const dexInput = document.getElementById('dexterity-input')
    const conInput = document.getElementById('constitution-input')
    const intInput = document.getElementById('intelligence-input')
    const wisInput = document.getElementById('wisdom-input')
    const chaInput = document.getElementById('charisma-input')

    strInput.value = str
    dexInput.value = dex
    conInput.value = con
    intInput.value = int
    wisInput.value = wis
    chaInput.value = cha
}
function monsterAbilitiesListeners(){
    // All the + Buttons for Inputs
    $('.input-group').on('click', '.button-plus', function(e) {
        modifierAbilityScore("+", e);
        const str = document.getElementById('strength-input').value
        const dex = document.getElementById('dexterity-input').value
        const con = document.getElementById('constitution-input').value
        const int = document.getElementById('intelligence-input').value
        const wis = document.getElementById('wisdom-input').value
        const cha = document.getElementById('charisma-input').value

        const monsterData = JSON.parse(localStorage.getItem('monster_data'))
        monsterData.ability_scores = {
            str: str,
            dex: dex,
            con: con,
            int: int,
            wis: wis,
            cha: cha
        }
        localStorage.setItem('monster_data', JSON.stringify(monsterData))      

        const abilitiesDiv = document.getElementById('abilities-statblock')
        abilitiesDiv.innerHTML = `<abilities-block data-cha="${cha}" data-con="${con}" data-dex="${dex}" data-int="${int}" data-str="${str}" data-wis="${wis}"></abilities-block>`
    });
    // All the - Buttons for Inputs
    $('.input-group').on('click', '.button-minus', function(e) {
        modifierAbilityScore("-", e);
        const str = document.getElementById('strength-input').value
        const dex = document.getElementById('dexterity-input').value
        const con = document.getElementById('constitution-input').value
        const int = document.getElementById('intelligence-input').value
        const wis = document.getElementById('wisdom-input').value
        const cha = document.getElementById('charisma-input').value

        const monsterData = JSON.parse(localStorage.getItem('monster_data'))
        monsterData.ability_scores = {
            str: str,
            dex: dex,
            con: con,
            int: int,
            wis: wis,
            cha: cha
        }
        localStorage.setItem('monster_data', JSON.stringify(monsterData)) 

        const abilitiesDiv = document.getElementById('abilities-statblock')
        abilitiesDiv.innerHTML = `<abilities-block data-cha="${cha}" data-con="${con}" data-dex="${dex}" data-int="${int}" data-str="${str}" data-wis="${wis}"></abilities-block>`
    });
}
// Senses
function monsterSenses(){
    const div = document.getElementById('senses-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`monster_data`)).senses

    for (let index = 0; index < senses.length; index++) {
        const element = senses[index];
        const label = document.createElement('label')
        label.innerText = `${capitalize(element)} (ft.)`
        label.setAttribute('for', `${element}-checkbox`)
        div.appendChild(label)
        
        const input = document.createElement('input')
        input.type = 'number'
        input.name = 'sense'
        input.id = `${element}-sense`
        if (selected) input.value = parseInt(selected[index])
        else input.value = 0
        div.appendChild(input)

        const brk = document.createElement('br')
        div.appendChild(brk)
    }
}
function monsterSensesListeners(){
    const radioGroups = document.getElementsByName('sense')
    let selected = []
    radioGroups.forEach(element => {
        element.addEventListener('input', function(){
            const selectedTypes = document.querySelectorAll(`input[name="sense"]`)
            selected = Array.from(selectedTypes).map(x => x.value)
            const stringList = selected.join("; ")
            let stringFinal = []
            document.getElementById(`senses-statblock`).innerText = ''

            for (let index = 0; index < senses.length; index++) {
                const element = senses[index];
                if (selected[index] == 0) continue
                stringFinal.push(`${element} ${selected[index]} ft.`)
            }
            
            document.getElementById(`senses-statblock`).innerText = stringFinal.join(", ")
            const monsterData = JSON.parse(localStorage.getItem('monster_data'))
            monsterData.senses = selected
            localStorage.setItem('monster_data', JSON.stringify(monsterData))
        })
    })
}
// Speed
function monsterSpeed(){
    const div = document.getElementById('speed-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`monster_data`)).speed

    for (let index = 0; index < speeds.length; index++) {
        const element = speeds[index];
        const label = document.createElement('label')
        label.innerText = `${capitalize(element)} (ft.)`
        label.setAttribute('for', `${element}-checkbox`)
        div.appendChild(label)
        
        const input = document.createElement('input')
        input.type = 'number'
        input.name = 'speed'
        input.id = `${element}-speed`
        if (selected) input.value = parseInt(selected[index])
        else input.value = 0
        div.appendChild(input)

        const brk = document.createElement('br')
        div.appendChild(brk)
    }
}
function monsterSpeedListeners(){
    const radioGroups = document.getElementsByName('speed')
    let selected = []
    radioGroups.forEach(element => {
        element.addEventListener('input', function(){
            const selectedTypes = document.querySelectorAll(`input[name="speed"]`)
            selected = Array.from(selectedTypes).map(x => x.value)
            let stringFinal = []
            document.getElementById(`speeds-statblock`).innerText = ''

            for (let index = 0; index < speeds.length; index++) {
                const element = speeds[index];
                if (selected[index] == 0) continue
                stringFinal.push(`${element} ${selected[index]} ft.`)
            }

            document.getElementById(`speeds-statblock`).innerText = stringFinal.join(", ")
            const monsterData = JSON.parse(localStorage.getItem('monster_data'))
            monsterData.speed = selected
            localStorage.setItem('monster_data', JSON.stringify(monsterData))
        })
    })
}
// Damage Immunities
function monsterDamageTypes(property){
    const div = document.getElementById('damage-types-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`monster_data`))[`damage_${property}`]
    
    damageTypes.forEach(element => {
        const span = document.createElement('span')
        span.classList.add('modal-flex-element')

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.name = 'damage-type-checkbox'
        input.id = `${element}-checkbox`
        input.value = element
        input.style.marginRight = '5px'
        if (selected && selected.includes(element)) input.checked = true
        span.appendChild(input)

        const label = document.createElement('label')
        label.innerText = capitalize(element)
        label.setAttribute('for', `${element}-checkbox`)
        
        if (element == "bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered") {
            label.innerText = "non-silvered"
            label.id = "non-silvered-label"
            label.classList.add("help")
        }
        if (element == "bludgeoning, piercing, and slashing from nonmagical attacks") {
            label.innerText = "non-magical"
            label.id = "non-magical-label"
            label.classList.add("help")
        }
        span.appendChild(label)

        div.appendChild(span)
    })

    addTippy("non-silvered-label", "bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered")
    addTippy("non-magical-label", "bludgeoning, piercing, and slashing from nonmagical attacks")
}
function monsterDamageTypesListeners(property){
    const radioGroups = document.getElementsByName('damage-type-checkbox')
    let selected = []
    const nonMagical = "bludgeoning, piercing, and slashing from nonmagical attacks"
    const nonSilvered = "bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered"
    
    radioGroups.forEach(element => {
        element.addEventListener('change', function(){
            const selectedTypes = document.querySelectorAll(`input[name="damage-type-checkbox"]:checked`)
            selected = Array.from(selectedTypes).map(x => x.value)
            const stringList = selected.join("; ")
            document.getElementById(`damage_${property}-statblock`).innerText = stringList
            const monsterData = JSON.parse(localStorage.getItem('monster_data'))
            monsterData[`damage_${property}`] = selected
            localStorage.setItem('monster_data', JSON.stringify(monsterData))
        })
    })
}