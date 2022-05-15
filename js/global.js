// Function to sum an array
function sumArray(array){
    return array.reduce((partialSum, a) => partialSum + a, 0);
}
// Declare a function to select a random value from a dictionary
// Source: https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
var randomProperty = function (obj) {
    try {
        var keys = Object.keys(obj); 
        return obj[keys[ keys.length * Math.random() << 0]];
    }
    catch(error) { console.error("randomProperty() ~~ ", error) }
}
// Function to capitalize first string of a single word
function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}
// Function to generate a random ID
// Source: https://gist.github.com/gordonbrander/2230317
function generateUniqueID() {
    return Math.random().toString(36).substr(2, 9);
}
// Function to get a selected value from a radio group
function getSelectedValueFromRadioGroup(radioGroupName, propertyToReturn){
    let initialize = document.getElementsByName(radioGroupName)
    initialize.forEach(element => {
        if (element.checked){ initialize = element[propertyToReturn] }
    })
    return initialize
}
// Sleep time expects milliseconds
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
// Pop a modal
function openModal(name, ID, content) {
    // Get Modal Elements
    const modal = document.getElementById("myModal") // Get the modal
    const span = document.getElementsByClassName("close")[0] // Get the <span> element that closes the modal
    const header = document.getElementById('modal-header') // Get the modal header
    const body = document.getElementById("monster-property-form") // Get the modal body
    modal.style.display = "block" // Display the modal
    // Set onClick Listeners for the modal
    span.onclick = function() { modal.style.display = "none" } // When the user clicks on <span> (x), close the modal
    window.onclick = function(event) { if (event.target == modal) modal.style.display = "none" } // When the user clicks anywhere outside of the modal, close it
    // Update Modal content
    const elementID = `${name}-statblock`
    name = name.replace("-", " ")
    header.innerText = name
    const htmlFilePath = `html_templates/statblock_modals/${content}`
    $(body).load(htmlFilePath)
}
// Function to save monster data from the statblock
function saveMonsterData(key, value) {
    console.log("Key:", key, "Value:", value)
    localStorage.setItem(key, value)
}
// Function to roll a die with some optional modifiers
// E.G. ndx plus/minus y time/divided by z
    // E.G. 20d8+3*10
    // E.G. 8d20-4/3 
function roll(diceString) {
    let rolls = []
    let total = 0
    const numberOfDice = parseInt(diceString.match(/(\d)+d/gm)[0].replace("d", '')) // Extract the number of dice from the string
    const dieSize = parseInt(diceString.match(/d(\d+)/gm)[0].replace("d", '')) // Extract the number of sides from the string
    for (let index = 0; index < numberOfDice; index++) { // Roll the die as many times as there are dice in the string
        const result = parseInt((Math.floor(Math.random() * ((dieSize + 1) - 1)) + 1)) // Pick a random number between 1 and the die size
        total += result
        rolls.push(result)
    }
    // Addition and Subtraction
    try {
        var addSubOperator = /(\+|\-)(\d+)/gm.exec(diceString)[1] // Extra the addition or subtraction operator
        var additionSubtractionModifier = parseInt(/(\+|\-)(\d+)/gm.exec(diceString)[2]) // Extract addition or subtraction modifier
        if (addSubOperator == "+") total += additionSubtractionModifier
        if (addSubOperator == "-") total -= additionSubtractionModifier
        if (total < 1) total = 1
    } catch(error) {
        // console.error("Roll() ~~ No addition or subtraction:", error)
    }
    // Multiplication and Division
    try {
        var divMultOperator = /(\/|\*)(\d+)/gm.exec(diceString)[1] // Extract the divide or multiplication operator
        var divisionMultiplicaitonModifier = parseInt(/(\/|\*)(\d+)/gm.exec(diceString)[2]) // Extract the divide or multiply modifier
        if (divMultOperator == "*") total = total * divisionMultiplicaitonModifier
        if (divMultOperator == "/") total = total / divisionMultiplicaitonModifier
    } catch(error) {
        // console.error("Roll() ~~ No multiplication or division:", error)
    }

    let rollObject = {
        number_of_dice: numberOfDice,
        number_of_sides: dieSize,
        add_sub_operator: addSubOperator,
        add_sub_mod: additionSubtractionModifier,
        div_mult_operator: divMultOperator,
        div_mult_mod: divisionMultiplicaitonModifier,
        total: parseInt(total),
        rolls: rolls
    }
    return rollObject
}