import inadimplencia from '../database/inadimplencia.json' with {type:"json"}

var deficit = inadimplencia['deficit']
var inadimplenciaGeral = document.getElementById("inadimplencia-real")
var gaga8 = document.getElementById("inadimplencia-gaga8")
var CASD = document.getElementById("inadimplencia-CASD")
var copinha = document.getElementById("inadimplencia-copinha")
var evtol = document.getElementById("inadimplencia-evtol")

function load_inadimplencia() {
    evtol.innerHTML = "A reforma de " + `<span style="font-weight: bold;">${String(deficit['evtol'])}</span>` + " salas da EVTOL"
    gaga8.innerHTML = "A construção de " + `<span style="font-weight: bold;">${String(deficit['gaga8'])}</span>` + " gaga8"
    copinha.innerHTML = "A construção de " + `<span style="font-weight: bold;">${String(deficit['copinha'])}</span>`  + " copinhas"
    CASD.innerHTML = "A reforma de " + `<span style="font-weight: bold;">${String(deficit['CASD'])}</span>` + " banheiros do CASDVest"
    inadimplenciaGeral.innerHTML = "R$ " + String(deficit['deficit']) + ",00"
}

if (document.readyState === "complete") {
    load_inadimplencia()
    console.log('readySate')
  } else {
    window.addEventListener('load', load_inadimplencia());
    console.log('event here')
  }