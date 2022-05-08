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