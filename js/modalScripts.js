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
    const properties = localStorage.getItem("properties")
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
            localStorage.setItem('properties', propString.toLowerCase())
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

    let str = localStorage.getItem('strength')
    let dex = localStorage.getItem('dexterity')
    let con = localStorage.getItem('constitution')
    let int = localStorage.getItem('intelligence')
    let wis = localStorage.getItem('wisdom')
    let cha = localStorage.getItem('charisma')

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

        localStorage.setItem('strength', str)
        localStorage.setItem('dexterity', dex)
        localStorage.setItem('constitution', con)
        localStorage.setItem('intelligence', int)
        localStorage.setItem('wisdom', wis)
        localStorage.setItem('charisma', cha)

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

        localStorage.setItem('strength', str)
        localStorage.setItem('dexterity', dex)
        localStorage.setItem('constitution', con)
        localStorage.setItem('intelligence', int)
        localStorage.setItem('wisdom', wis)
        localStorage.setItem('charisma', cha)

        const abilitiesDiv = document.getElementById('abilities-statblock')
        abilitiesDiv.innerHTML = `<abilities-block data-cha="${cha}" data-con="${con}" data-dex="${dex}" data-int="${int}" data-str="${str}" data-wis="${wis}"></abilities-block>`
    });
}
// Senses
function monsterSenses(){
    const div = document.getElementById('senses-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`senses`))

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

            localStorage.setItem(`senses`, JSON.stringify(selected))
        })
    })
}
// Speed
function monsterSpeed(){
    const div = document.getElementById('speed-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`speed`))

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
            localStorage.setItem(`speed`, JSON.stringify(selected))
        })
    })
}
// Saving Throws
function monsterSavingThrows(){
    const div = document.getElementById('saving-throw-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`saving-throws`))

    abilities.forEach(element => {
        const span = document.createElement('span')
        span.classList.add('modal-flex-element')

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.name = 'saving-throw'
        input.id = `${element}-checkbox`
        input.value = element
        input.style.marginRight = '5px'
        if (selected && selected.includes(element)) input.checked = true
        span.appendChild(input)

        const label = document.createElement('label')
        label.innerText = capitalize(element)
        label.setAttribute('for', `${element}-checkbox`)
        label.style.overflow = 'ellipsis'
        span.appendChild(label)
        
        div.appendChild(span)
    })
}
function monsterSavingThrowsListeners(){
    const radioGroups = document.getElementsByName('saving-throw')
    let selected = []
    radioGroups.forEach(element => {
        element.addEventListener('change', function(){
            const selectedTypes = document.querySelectorAll(`input[name="saving-throw"]:checked`)
            selected = Array.from(selectedTypes).map(x => x.value)
            const stringList = selected.join("; ")
            document.getElementById(`saving_throws-statblock`).innerText = stringList
            
            localStorage.setItem(`saving-throws`, JSON.stringify(selected))
        })
    })
}
// Skills
function monsterSkills(){
    const div = document.getElementById('skills-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`skills`))

    skills.forEach(element => {
        const span = document.createElement('span')
        span.classList.add('modal-flex-element')

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.name = 'skills-checkbox'
        input.id = `${element}-checkbox`
        input.value = element
        input.style.marginRight = '5px'
        if (selected && selected.includes(element)) input.checked = true
        span.appendChild(input)

        const label = document.createElement('label')
        label.innerText = capitalize(element)
        label.setAttribute('for', `${element}-checkbox`)
        label.style.overflow = 'ellipsis'
        span.appendChild(label)

        div.appendChild(span)
    })
}
function monsterSkillsListeners(){
    const radioGroups = document.getElementsByName('skills-checkbox')
    let selected = []
    radioGroups.forEach(element => {
        element.addEventListener('change', function(){
            const selectedTypes = document.querySelectorAll(`input[name="skills-checkbox"]:checked`)
            selected = Array.from(selectedTypes).map(x => x.value)
            console.log("Selected Damage Types:", selected)
            const stringList = selected.join("; ")
            document.getElementById(`skills-statblock`).innerText = stringList
            
            localStorage.setItem(`skills`, JSON.stringify(selected))
        })
    })
}
// Damage Immunities
function monsterDamageTypes(property){
    const div = document.getElementById('damage-types-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`damage-${property}`))
    
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
        }
        if (element == "bludgeoning, piercing, and slashing from nonmagical attacks") {
            label.innerText = "non-magical"
            label.id = "non-magical-label"
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
            
            localStorage.setItem(`damage-${property}`, JSON.stringify(selected))
        })
    })
}
// Conditions
function monsterConditions(){
    const div = document.getElementById('conditions-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`conditions`))

    conditions.forEach(element => {
        const span = document.createElement('span')
        span.classList.add('modal-flex-element')

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.name = 'condition-checkbox'
        input.id = `${element}-checkbox`
        input.value = element
        input.style.marginRight = '5px'
        if (selected && selected.includes(element)) input.checked = true
        span.appendChild(input)

        const label = document.createElement('label')
        label.innerText = capitalize(element)
        label.setAttribute('for', `${element}-checkbox`)
        span.appendChild(label)

        div.appendChild(span)
        // const brk = document.createElement('br')
        // div.appendChild(brk)
    })
}
function monsterConditionsListeners(){
    const radioGroups = document.getElementsByName('condition-checkbox')
    let selected = []
    radioGroups.forEach(element => {
        element.addEventListener('change', function(){
            const selectedTypes = document.querySelectorAll(`input[name="condition-checkbox"]:checked`)
            selected = Array.from(selectedTypes).map(x => x.value)
            const stringList = selected.join("; ")
            document.getElementById(`condition_immunities-statblock`).innerText = stringList
            
            localStorage.setItem(`conditions`, JSON.stringify(selected))
        })
    })
}
// Languages
function monsterLanguages(){
    const div = document.getElementById('languages-checkboxes')
    const selected = JSON.parse(localStorage.getItem(`languages`))

    languages.forEach(element => {
        const span = document.createElement('span')
        span.classList.add('modal-flex-element')

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.name = 'language-checkbox'
        input.id = `${element}-checkbox`
        input.value = element
        input.style.marginRight = '5px'
        if (selected && selected.includes(element)) input.checked = true
        span.appendChild(input)

        const label = document.createElement('label')
        label.innerText = capitalize(element)
        label.setAttribute('for', `${element}-checkbox`)
        span.appendChild(label)

        div.appendChild(span)
    })
}
function monsterLanguagesListeners(){
    const radioGroups = document.getElementsByName('language-checkbox')
    let selected = []
    radioGroups.forEach(element => {
        element.addEventListener('change', function(){
            const selectedTypes = document.querySelectorAll(`input[name="language-checkbox"]:checked`)
            selected = Array.from(selectedTypes).map(x => x.value)
            const stringList = selected.join("; ")
            document.getElementById(`languages-statblock`).innerText = stringList
            
            localStorage.setItem(`languages`, JSON.stringify(selected))
        })
    })
}