// ================= Page Listeners =================
// Function to set the listeners on index.html
function indexListeners() {
    let creator = document.getElementsByName('method')
    creator.forEach(element => {
        const ID = element.id
        element.addEventListener('change', function() { populateCreator() })
    });

    document.getElementById('theme-changer').addEventListener('click', function() { changeTheme() })
}
// I Got This and Pre. Gens. Listeners
function iGotThisListeners(){
    document.getElementById('cr').addEventListener('change', function() { iGotThisCRFunction(this) }) // Challenge Rating
    // Type Radio Group
    let typeRadios = document.getElementsByName('type')
    typeRadios.forEach(element => {
      element.addEventListener('change', function() { monsterType() })
    });
    // Reset to Defaults for the chosen CR
    document.getElementById('reset-values').addEventListener('click', function() { 
        let cr = document.getElementById('cr')
        iGotThisCRFunction(cr) 
    })
    // All the + Buttons for Inputs
    $('.input-group').on('click', '.button-plus', function(e) {
        incrementValue(e);
    });
    // All the - Buttons for Inputs
    $('.input-group').on('click', '.button-minus', function(e) {
        decrementValue(e);
    });
    // --------------------
    //   Statblock Inputs
    // --------------------
    sleep(400).then(() => { // I hate this... The statblock is loaded over 100 lines before this is run but it still needs to be awaited...
        const statblockInputs = document.querySelectorAll('.statblock-input')
        statblockInputs.forEach(element => {
            element.addEventListener('click', function() { 
                const ID = this.id
                const name = ID.replace("-statblock", "")
                const htmlFile = `${name}.html`
                openModal(name, ID, htmlFile)
            })
        })
        
        document.getElementById('download-statblock').addEventListener('click', function() { downloadStatblockAsImage() })
        document.getElementById('download-foundry-vtt').addEventListener('click', function() { downloadFoundryVtt() })
        document.getElementById('download-fantasy-grounds').addEventListener('click', function() { downloadaFantasyGrounds() })

        const rollableElements = document.querySelectorAll('.rollable-element')
        console.log("Rollable Elements:", rollableElements)
        rollableElements.forEach(element => {
            element.addEventListener('click', function() { onClickRollCheck(e) })
        })

        const abilityScoresElements = document.querySelectorAll('.abilities-modal')
        console.log("Ability Score Elements:", abilityScoresElements)
        abilityScoresElements.forEach(element => {
            element.addEventListener('click', function() { openModal("Ability Scores", "abilities-statblock", "abilities.html") })
        })
    })
}
// Random Listeners
function randomListeners(){
    let creator = document.getElementsByName('generation-method')
    creator.forEach(element => {
        element.addEventListener('change', function() { populateGenerator() })
    });
}
function randomStatblockListeners(){
    sleep(400).then(() => { // I hate this... The statblock is loaded over 100 lines before this is run but it still needs to be awaited...
        const statblockInputs = document.querySelectorAll('.statblock-input')
        statblockInputs.forEach(element => {
            element.addEventListener('click', function() { 
                const ID = this.id
                const name = ID.replace("-statblock", "")
                const htmlFile = `${name}.html`
                openModal(name, ID, htmlFile)
            })
        })
        
        document.getElementById('download-statblock').addEventListener('click', function() { downloadStatblockAsImage() })
        document.getElementById('download-foundry-vtt').addEventListener('click', function() { downloadFoundryVtt() })
        document.getElementById('download-fantasy-grounds').addEventListener('click', function() { downloadaFantasyGrounds() })
        addTippy('download-statblock', 'Download as a PNG <br> Not yet fully implemented. Take a screenshot instead.')
        addTippy('download-foundry-vtt', 'Download for FoundryVTT <br> Not yet implemented.')
        addTippy('download-fantasy-grounds', 'Download for Fantasy Grounds <br> Not yet implemented.')

        const rollableElements = document.querySelectorAll('.rollable-element')
        console.log("Rollable Elements:", rollableElements)
        rollableElements.forEach(element => {
            element.addEventListener('click', function() { onClickRollCheck(e) })
        })

        const abilityScoresElements = document.querySelectorAll('.abilities-modal')
        console.log("Ability Score Elements:", abilityScoresElements)
        abilityScoresElements.forEach(element => {
            element.addEventListener('click', function() { openModal("Ability Scores", "abilities-statblock", "abilities.html") })
        })
    })
    
}
// ================= Element Listeners =================
// Theme changer 
function changeTheme(){
    const theme = localStorage.getItem('theme')
    // Light Theme
    if (theme == 'dark') {
        localStorage.setItem('theme', 'light')
        document.getElementById('theme-css').setAttribute('href', 'css/light.css')
    }
    // Dark Theme
    else {
        localStorage.setItem('theme', 'dark')
        document.getElementById('theme-css').setAttribute('href', 'css/dark.css')
    }
}
// Function to increment number input value
function incrementValue(e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    let ID = parent.find('input[name=' + fieldName + ']')[0]['id']
    let val
    if (ID == 'save-sum-input') { val = 6 }
    else if (ID == 'hit-points-input') { val = 8 }
    else if (ID == 'damage-per-round-input') { val = 3 }
    else { val = 1 }
    // ---------------------------
    //       Update Points
    // ---------------------------
    let points = parseInt(document.getElementById('points').innerText)
    if (points - 1 < 0) {
        new Toast({
            message: `You cannot have fewer than 0 points. Try reducing some inputs to get some points back.`,
            type: 'danger'
        })
        return
    }
    document.getElementById('points').innerText = points - 1
    // ---------------------------
    //       Update Value
    // ---------------------------
    if (!isNaN(currentVal)) {
        parent.find('input[name=' + fieldName + ']').val(currentVal + val);
    } else {
        parent.find('input[name=' + fieldName + ']').val(0);
    }
    // ---------------------------
    //     Update Joined Inputs
    // ---------------------------
    if (ID == 'to-hit-input') {
        document.getElementById('spell-to-hit-input').value = parseInt(document.getElementById('spell-to-hit-input').value) + 1
        document.getElementById('spell-save-dc-input').value = parseInt(document.getElementById('spell-save-dc-input').value) + 1
    } else if (ID == 'spell-to-hit-input') {
        document.getElementById('to-hit-input').value = parseInt(document.getElementById('to-hit-input').value) + 1
        document.getElementById('spell-save-dc-input').value = parseInt(document.getElementById('spell-save-dc-input').value) + 1
    } else if (ID == 'spell-save-dc-input') {
        document.getElementById('to-hit-input').value = parseInt(document.getElementById('to-hit-input').value) + 1
        document.getElementById('spell-to-hit-input').value = parseInt(document.getElementById('spell-to-hit-input').value) + 1
    }
    // ---------------------------
    //     Update Statblock
    // ---------------------------
    statblockID = ID.replace("-input", "-statblock")
    let hitDice
    let cr = document.getElementById('cr').value
    let newVal = currentVal + val
    if (statblockID == "hit-points-statblock") {
        hitDice = damageToDice(newVal, cr)[1]
        document.getElementById(statblockID).innerText = `${newVal} (${hitDice})`
    } else document.getElementById(statblockID).innerText = newVal
    // ---------------------------
    //     Update Local Storage
    // ---------------------------
    localStorage.setItem('hp', document.getElementById('hit-points-statblock').innerText)
    localStorage.setItem('ac', document.getElementById('armor-class-statblock').innerText)
}
// Function to decrement number input value
function decrementValue(e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    let ID = parent.find('input[name=' + fieldName + ']')[0]['id']
    let val
    if (ID == 'save-sum-input') { val = 6 }
    else if (ID == 'hit-points-input') { val = 8 }
    else if (ID == 'damage-per-round-input') { val = 3 }
    else { val = 1 }
    if ( ID == 'save-sum' && currentVal - val < 0){
        new Toast({
            message: `<B>The Dex./Con./Wis. Save Sum</B> cannot go below 0.`,
            type: 'warning'
        })
        return
    }
    if (!isNaN(currentVal) && currentVal > 0) {
      parent.find('input[name=' + fieldName + ']').val(currentVal - val);
    } else {
      parent.find('input[name=' + fieldName + ']').val(0);
    }
    // ---------------------------
    //       Update Points
    // ---------------------------
    let points = parseInt(document.getElementById('points').innerText)
    document.getElementById('points').innerText = points + 1
    // ---------------------------
    //     Update Joined Inputs
    // ---------------------------
    if (ID == 'to-hit-input') {
        document.getElementById('spell-to-hit-input').value = parseInt(document.getElementById('spell-to-hit-input').value) - 1
        document.getElementById('spell-save-dc-input').value = parseInt(document.getElementById('spell-save-dc-input').value) - 1
    } else if (ID == 'spell-to-hit-input') {
        document.getElementById('to-hit-input').value = parseInt(document.getElementById('to-hit-input').value) - 1
        document.getElementById('spell-save-dc-input').value = parseInt(document.getElementById('spell-save-dc-input').value) - 1
    } else if (ID == 'spell-save-dc-input') {
        document.getElementById('to-hit-input').value = parseInt(document.getElementById('to-hit-input').value) - 1
        document.getElementById('spell-to-hit-input').value = parseInt(document.getElementById('spell-to-hit-input').value) - 1
    }
    // ---------------------------
    //     Update Statblock
    // ---------------------------
    statblockID = ID.replace("-input", "-statblock")
    let hitDice
    let cr = document.getElementById('cr').value
    let newVal = currentVal - val
    if (statblockID == "hit-points-statblock") {
        hitDice = damageToDice(newVal, cr)[1]
        document.getElementById(statblockID).innerText = `${newVal} (${hitDice})`
    } else document.getElementById(statblockID).innerText = newVal
    // ---------------------------
    //     Update Local Storage
    // ---------------------------
    localStorage.setItem('hp', document.getElementById('hit-points-statblock').innerText)
    localStorage.setItem('ac', document.getElementById('armor-class-statblock').innerText)
}
// Modifier Ability Score
function modifierAbilityScore(operator, e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    let ID = parent.find('input[name=' + fieldName + ']')[0]['id']
    let val
    if (!isNaN(currentVal) && currentVal > 0) {
        if (operator == "-") val = currentVal - 1
        else if (operator == "+") val = currentVal + 1
        if (val > 30) val = 30 // Abilities cannot exceed 30
        parent.find('input[name=' + fieldName + ']').val(val);
    } else {
        parent.find('input[name=' + fieldName + ']').val(0);
    }
}