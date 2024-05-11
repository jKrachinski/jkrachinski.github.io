//imports a database which contains every information since July 2023
import database from '../database/database.json' with {type: "json"};

var selectMonth = document.getElementById("select-month")
var selectYear = document.getElementById("select-year")

var years = Object.keys(database)
var length = selectYear.options.length
for (var i = 0; i < length; i++) {
    selectYear.remove(0)
}

for (var k = years.length-1; k >= 0; k--) {
    var temp = document.createElement('option')
    temp.text = years[k]
    selectYear.add(temp, k)
}

var months = Object.keys(database[selectYear.options[selectYear.selectedIndex].text])
var length = selectMonth.options.length
for (var i = 0; i < length; i++) {
    selectMonth.remove(0)
}

for (var k = 0; k < months.length; k++) {
    var temp = document.createElement('option')
    temp.text = months[k]
    selectMonth.add(temp, k)
}
var temp = document.createElement('option')
temp.text = months[0]
selectMonth.add(temp, 0)

    
selectMonth.remove(0)

//whenever the year changes, this function changes the months available for selection
//it is only necessary to update the database
selectYear.addEventListener('change', () => {
    var months = Object.keys(database[selectYear.options[selectYear.selectedIndex].text])
    var length = selectMonth.options.length
    for (var i = 0; i < length; i++) {
        selectMonth.remove(0)
    }

    for (var k = 0; k < months.length; k++) {
        var temp = document.createElement('option')
        temp.text = months[k]
        selectMonth.add(temp, k)
    }
    var temp = document.createElement('option')
    temp.text = months[0]
    selectMonth.add(temp, 0)
    
        
    selectMonth.remove(0)
})