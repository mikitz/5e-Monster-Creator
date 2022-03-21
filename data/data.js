let xpByCr = [
    {"CR":0,"XP":10},
    {"CR":0.125,"XP":25},
    {"CR":0.25,"XP":50},
    {"CR":0.5,"XP":100},
    {"CR":1,"XP":200},
    {"CR":2,"XP":450},
    {"CR":3,"XP":700},
    {"CR":4,"XP":1100},
    {"CR":5,"XP":1800},
    {"CR":6,"XP":2300},
    {"CR":7,"XP":2900},
    {"CR":8,"XP":3900},
    {"CR":9,"XP":5000},
    {"CR":10,"XP":5900},
    {"CR":11,"XP":7200},
    {"CR":12,"XP":8400},
    {"CR":13,"XP":10000},
    {"CR":14,"XP":11500},
    {"CR":15,"XP":13000},
    {"CR":16,"XP":15000},
    {"CR":17,"XP":18000},
    {"CR":18,"XP":20000},
    {"CR":19,"XP":22000},
    {"CR":20,"XP":25000},
    {"CR":21,"XP":33000},
    {"CR":22,"XP":41000},
    {"CR":23,"XP":50000},
    {"CR":24,"XP":62000},
    {"CR":25,"XP":75000},
    {"CR":26,"XP":90000},
    {"CR":27,"XP":105000},
    {"CR":28,"XP":120000},
    {"CR":29,"XP":135000},
    {"CR":30,"XP":155000}
]

let elementTablePairs = [
    {elemId: 'armor-class-input', data: 'Armor Class'},
    {elemId: 'hit-points-input', data: 'Hit Points'},
    {elemId: 'to-hit-input', data: 'To Hit Bonus'},
    {elemId: 'damage-per-round-input', data: 'Damage /Round'},
    {elemId: 'spell-save-dc-input', data: 'DC'},
    {elemId: 'spell-to-hit-input', data: 'Spell To Hit'},
    {elemId: 'save-sum-input', data: 'Sum D/C/W Save'},
]

let rothnersChartV2 = [
    {"CR":0.25,"Level":"1/2","Prof":2,"Armor Class":12,"Hit Points":15,"Sum D/C/W Save":2,"Damage /Round":6,"To Hit Bonus":4,"DC":11,"Spell To Hit":3,"Spell Level":"C","Effective Spell Dmg":5.5},
    {"CR":1,"Level":"2","Prof":2,"Armor Class":13,"Hit Points":30,"Sum D/C/W Save":3,"Damage /Round":12,"To Hit Bonus":4.5,"DC":11.5,"Spell To Hit":3.5,"Spell Level":1,"Effective Spell Dmg":14},
    {"CR":2,"Level":"3","Prof":2,"Armor Class":14,"Hit Points":45,"Sum D/C/W Save":4,"Damage /Round":18,"To Hit Bonus":5,"DC":12,"Spell To Hit":4,"Spell Level":2,"Effective Spell Dmg":21},
    {"CR":3,"Level":"4","Prof":2,"Armor Class":14,"Hit Points":60,"Sum D/C/W Save":6,"Damage /Round":24,"To Hit Bonus":5.5,"DC":12.5,"Spell To Hit":4.5,"Spell Level":2,"Effective Spell Dmg":21},
    {"CR":4,"Level":"5","Prof":2,"Armor Class":14,"Hit Points":75,"Sum D/C/W Save":7,"Damage /Round":30,"To Hit Bonus":6,"DC":13,"Spell To Hit":5,"Spell Level":3,"Effective Spell Dmg":34},
    {"CR":5,"Level":"7","Prof":3,"Armor Class":15,"Hit Points":90,"Sum D/C/W Save":9,"Damage /Round":36,"To Hit Bonus":6.5,"DC":13.5,"Spell To Hit":5.5,"Spell Level":3,"Effective Spell Dmg":34},
    {"CR":6,"Level":"9","Prof":3,"Armor Class":15,"Hit Points":105,"Sum D/C/W Save":10,"Damage /Round":42,"To Hit Bonus":7,"DC":14,"Spell To Hit":6,"Spell Level":4,"Effective Spell Dmg":41},
    {"CR":7,"Level":"10","Prof":3,"Armor Class":15,"Hit Points":120,"Sum D/C/W Save":12,"Damage /Round":48,"To Hit Bonus":7.5,"DC":14.5,"Spell To Hit":6.5,"Spell Level":4,"Effective Spell Dmg":41},
    {"CR":8,"Level":"11","Prof":3,"Armor Class":16,"Hit Points":135,"Sum D/C/W Save":13,"Damage /Round":54,"To Hit Bonus":8,"DC":15,"Spell To Hit":7,"Spell Level":5,"Effective Spell Dmg":55},
    {"CR":9,"Level":"13","Prof":4,"Armor Class":16,"Hit Points":150,"Sum D/C/W Save":15,"Damage /Round":60,"To Hit Bonus":8.5,"DC":15.5,"Spell To Hit":7.5,"Spell Level":5,"Effective Spell Dmg":55},
    {"CR":10,"Level":"14","Prof":4,"Armor Class":16,"Hit Points":165,"Sum D/C/W Save":16,"Damage /Round":66,"To Hit Bonus":9,"DC":16,"Spell To Hit":8,"Spell Level":6,"Effective Spell Dmg":69},
    {"CR":11,"Level":"16","Prof":4,"Armor Class":17,"Hit Points":180,"Sum D/C/W Save":18,"Damage /Round":72,"To Hit Bonus":9.5,"DC":16.5,"Spell To Hit":8.5,"Spell Level":6,"Effective Spell Dmg":69},
    {"CR":12,"Level":"17","Prof":4,"Armor Class":17,"Hit Points":195,"Sum D/C/W Save":19,"Damage /Round":78,"To Hit Bonus":10,"DC":17,"Spell To Hit":9,"Spell Level":7,"Effective Spell Dmg":76},
    {"CR":13,"Level":"18","Prof":5,"Armor Class":17,"Hit Points":210,"Sum D/C/W Save":21,"Damage /Round":84,"To Hit Bonus":10.5,"DC":17.5,"Spell To Hit":9.5,"Spell Level":8,"Effective Spell Dmg":83},
    {"CR":14,"Level":"19","Prof":5,"Armor Class":18,"Hit Points":225,"Sum D/C/W Save":22,"Damage /Round":90,"To Hit Bonus":11,"DC":18,"Spell To Hit":10,"Spell Level":8,"Effective Spell Dmg":83},
    {"CR":15,"Level":"20","Prof":5,"Armor Class":18,"Hit Points":240,"Sum D/C/W Save":24,"Damage /Round":96,"To Hit Bonus":11.5,"DC":18.5,"Spell To Hit":10.5,"Spell Level":9,"Effective Spell Dmg":103},
    {"CR":16,"Level":">20","Prof":5,"Armor Class":18,"Hit Points":255,"Sum D/C/W Save":25,"Damage /Round":102,"To Hit Bonus":12,"DC":19,"Spell To Hit":11,"Spell Level":9,"Effective Spell Dmg":103},
    {"CR":17,"Level":">20","Prof":6,"Armor Class":19,"Hit Points":270,"Sum D/C/W Save":27,"Damage /Round":108,"To Hit Bonus":12.5,"DC":19.5,"Spell To Hit":11.5,"Spell Level":9,"Effective Spell Dmg":103}
] 
/** ADJUSTMENTS FROM THE ORIGINAL
 * 1.) To Hit Bonus is now rounded down as the original chart had values ending in 0.5, E.G. CR 9 had a To Hit Bonus of 8.5. The CR 9 To Hit Bonus is not 8. To compensate for this, 4 HP was added to the Hit Points column.
 * 2.) 
 */