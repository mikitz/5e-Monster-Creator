// Function to set the listeners on index.html
function indexListeners() {
    let creator = document.getElementsByName('method')
    creator.forEach(element => {
        const ID = element.id
        element.addEventListener('change', function() { populateCreator() })
    });
}

function iGotThisListeners(){
    document.getElementById('cr').addEventListener('change', function() { iGotThisCRFunction(this) })
    let typeRadios = document.getElementsByName('type')
    typeRadios.forEach(element => {
      element.addEventListener('change', function() { monsterType() })
    });
}

function walkthroughListeners(){

}

function randomListeners(){
    
}