// ===============================
//       Page Listeners
// ===============================
// Function to set the listeners on index.html
function indexListeners() {
    let creator = document.getElementsByName('method')
    creator.forEach(element => {
        const ID = element.id
        element.addEventListener('change', function() { populateCreator() })
    });
}

function iGotThisListeners(){
    document.getElementById('cr').addEventListener('change', function() { iGotThisCRFunction(this) }) // Challenge Rating
    // Type Radio Group
    let typeRadios = document.getElementsByName('type')
    typeRadios.forEach(element => {
      element.addEventListener('change', function() { monsterType() })
    });
    let buttonPlus = document.querySelectorAll('.button-plus')
    buttonPlus.forEach(element => {
        element.addEventListener('click', function() { onInputChange() })
    });
    let buttonMinus = document.querySelectorAll('.button-plus')
    buttonMinus.forEach(element => {
        element.addEventListener('click', function() { onInputChange() })
    });
    // All the + Buttons for Inputs
    $('.input-group').on('click', '.button-plus', function(e) {
        incrementValue(e);
    });
    // All the - Buttons for Inputs
    $('.input-group').on('click', '.button-minus', function(e) {
        decrementValue(e);
    });
}

function walkthroughListeners(){

}

function randomListeners(){
    
}
// ===============================
//       Element Listeners
// ===============================
function onInputChange(){
    // -------------------
    //    Weapon To Hit
    // -------------------
    // Check to see if sufficient points
    let points = parseInt(document.getElementById('points').innerText)
    console.log("Points:", points)

    // -------------------
    //  Damage per Round
    // -------------------

    // -------------------
    //    Spell Save DC
    // -------------------

    // -------------------
    //   Spell To Hit
    // -------------------

    // -------------------
    //      Save Sum
    // -------------------

}