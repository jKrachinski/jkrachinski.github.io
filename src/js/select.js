var months2024 = ["Janeiro", "Fevereiro", "Março"]
var months2023 = ["Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

var selectMonth = document.getElementById("select-month")
var selectYear = document.getElementById("select-year")
var project_button = document.getElementById("button-projects")



selectYear.addEventListener('change', () => {
    if (selectYear.options[selectYear.selectedIndex].text == "2024"){
        var length = selectMonth.options.length
        for (var i = 0; i < length; i++) {
            selectMonth.remove(0)
        }

        for (var k = 0; k < months2024.length; k++) {
            var temp = document.createElement('option')
            temp.text = months2024[k]
            selectMonth.add(temp, k)
        }
        var temp = document.createElement('option')
        temp.text = months2024[0]
        selectMonth.add(temp, 0)

    } else if (selectYear.options[selectYear.selectedIndex].text == "2023") {
        console.log(selectMonth.options.length)
        var length = selectMonth.options.length
        for (var i = 0; i < length; i++) {
            selectMonth.remove(0)
        }
        
        for (var k = 0; k < months2023.length; k++) {
            var temp = document.createElement('option')
            temp.text = months2023[k]
            selectMonth.add(temp, k)
        }

        var temp = document.createElement('option')
        temp.text = months2023[0]
        selectMonth.add(temp, 0)
    }
        
    console.log(selectYear.options[selectYear.selectedIndex].text)
    selectMonth.remove(0)
})