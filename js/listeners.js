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
}

function walkthroughListeners(){

}

function randomListeners(){
    
}
// ===============================
//       Element Listeners
// ===============================
// Theme changer 
function changeTheme(){
    let theme = document.getElementById('theme').checked

    // Light Theme
    if (theme == true) {

    }
    // Dark Theme
    else {
        
    }
}
// Function to increment number input value
function incrementValue(e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    let ID = parent.find('input[name=' + fieldName + ']')[0]['id']
    // console.log("ID:", ID)
    let val
    if (ID == 'save-sum') { val = 6 }
    else if (ID == 'hit-points-input') { val = 8 }
    else if (ID == 'damage-per-round') { val = 3 }
    else { val = 1 }
    if (!isNaN(currentVal)) {
      parent.find('input[name=' + fieldName + ']').val(currentVal + val);
    } else {
      parent.find('input[name=' + fieldName + ']').val(0);
    }
    // ---------------------------
    //       Update Points
    // ---------------------------
    let points = parseInt(document.getElementById('points').innerText)
    document.getElementById('points').innerText = points - 1
    // ---------------------------
    //     Update Joined Inputs
    // ---------------------------
    if (ID == 'to-hit-and-dc-bonus') {
        document.getElementById('spell-to-hit').value = parseInt(document.getElementById('spell-to-hit').value) + 1
        document.getElementById('spell-save-dc').value = parseInt(document.getElementById('spell-save-dc').value) + 1
    } else if (ID == 'spell-to-hit') {
        document.getElementById('to-hit-and-dc-bonus').value = parseInt(document.getElementById('to-hit-and-dc-bonus').value) + 1
        document.getElementById('spell-save-dc').value = parseInt(document.getElementById('spell-save-dc').value) + 1
    } else if (ID == 'spell-save-dc') {
        document.getElementById('to-hit-and-dc-bonus').value = parseInt(document.getElementById('to-hit-and-dc-bonus').value) + 1
        document.getElementById('spell-to-hit').value = parseInt(document.getElementById('spell-to-hit').value) + 1
    }
}
// Function to decrement number input value
function decrementValue(e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    let ID = parent.find('input[name=' + fieldName + ']')[0]['id']
    // console.log("ID:", ID)
    let val
    if (ID == 'save-sum') { val = 6 }
    else if (ID == 'hit-points-input') { val = 8 }
    else if (ID == 'damage-per-round') { val = 3 }
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
    if (ID == 'to-hit-and-dc-bonus') {
        document.getElementById('spell-to-hit').value = parseInt(document.getElementById('spell-to-hit').value) - 1
        document.getElementById('spell-save-dc').value = parseInt(document.getElementById('spell-save-dc').value) - 1
    } else if (ID == 'spell-to-hit') {
        document.getElementById('to-hit-and-dc-bonus').value = parseInt(document.getElementById('to-hit-and-dc-bonus').value) - 1
        document.getElementById('spell-save-dc').value = parseInt(document.getElementById('spell-save-dc').value) - 1
    } else if (ID == 'spell-save-dc') {
        document.getElementById('to-hit-and-dc-bonus').value = parseInt(document.getElementById('to-hit-and-dc-bonus').value) - 1
        document.getElementById('spell-to-hit').value = parseInt(document.getElementById('spell-to-hit').value) - 1
    }
}