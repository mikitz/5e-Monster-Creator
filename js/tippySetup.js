function addTippy(ID, content){
    tippy(`#${ID}`, {
        content: `${content}`,
        allowHTML: true,
    })
}

function iGotThisTippy(){
    addTippy('armor-class-info', `<b><u>Armor Class</u></b><br> It costs 1 point to increase this by 1. <br><i>Armor Class column on Rothner's V2 chart.</i>`)
    addTippy('hit-points-info', `<b><u>Hit Points</u></b><br> It costs 1 point to increase this by 8. <br><i>Hit Points column on Rothner's V2 chart.</i>`)
    addTippy('to-hit-and-dc-bonus-info', "<b><u>To Hit</u></b><br> It costs 1 point to increase the To Hit by 1, the Spell Save DC by 1, and the Spell To Hit by 1. <br><i>To Hit Bonus column on Rothner's V2 chart.</i>") // To Hit & Spell Save DC
    addTippy('points-info', '<b><u>Points</u></b><br> Points = CR * 5 + 8 <br> Use these points to purchase the below items and see the changes reflected in the statblock to the left.') // Points
    addTippy('damage-per-round-info', "<u><b>Effective Damage per Round</u></b><br> It costs 1 point to increase this by 3. <br><i>Damage/Round column on Rothner's V2 chart.</i>") // Damage per Round
    addTippy('spell-save-dc-info', "<u><b>Spell Save DC</u></b><br> It costs 1 point to increase the To Hit by 1, the Spell Save DC by 1, and the Spell To Hit by 1. <br><i>DC column on Rothner's V2 chart.</i>")
    addTippy('cr-info', "<u><b>Challenge Rating</u></b><br> This is used to determine how many points you get to spend: Points = CR * 5 + 8")
    addTippy('spell-to-hit-info', "<u><b>Spell To Hit</u></b><br> It costs 1 point to increase the To Hit by 1, the Spell Save DC by 1, and the Spell To Hit by 1. <br><i>Spell To Hit column on Rothner's V2 chart.</i>")
    addTippy('spell-level-info', "<u><b>Spell Level</u></b><br> This is the maximum spell level this monster can use. <br><i>Spell Level column on Rothner's V2 chart.</i>")
    addTippy('spell-damage-info', "<u><b>Effective Spell Damage</u></b><br> The is the effective average spell damage this monster can deal per spell. This is used as a guideline for the suggested spells. <br><i>Effective Spell Damage column on Rothner's V2 chart.</i>")
    addTippy('save-sum-info', "<u><b>Dex./Con./Wis. Save Sum</u></b><br> This is the amount that you can distribute as you see fit across the aforementioned saves: Dexterity, Constitution, and Wisdom. It costs 1 point to increase this by 6. <br><i>Sum D/C/W Save column on Rothner's V2 chart.</i>")
    addTippy('type-info', "<u><b>Monster Type</u></b><br> This choice determines which inputs to which you will gain access.")
    addTippy('reset-values', 'Click to reset to defaults for the selected CR.')
}

function walkthroughTippy(){

}

function randomTippy(){

}