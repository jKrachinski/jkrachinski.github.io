import julho2023 from '../database/2023Julho.json' with {type: "json"};
import agosto2023 from '../database/2023Agosto.json' with {type: "json"};
import setembro2023 from '../database/2023Setembro.json' with {type: "json"};
import outubro2023 from '../database/2023Outubro.json' with {type: "json"};
import novembro2023 from '../database/2023Novembro.json' with {type: "json"};
import dezembro2023 from '../database/2023Dezembro.json' with {type: "json"};
import janeiro2024 from '../database/2024Janeiro.json' with {type: "json"};
import fevereiro2024 from '../database/2024Fevereiro.json' with {type: "json"};
import marco2023 from '../database/2024Março.json' with {type: "json"};

var dados = janeiro2024
var selectMonth = document.getElementById("select-month")
var selectYear = document.getElementById("select-year")
var area = 'projetos'
var cost_area = 'custos projetos'

var saldoinicial = document.getElementById("saldo-inicial")
var saldofinal = document.getElementById("saldo-final")
var entradastotal = document.getElementById("entradas-total")
var saidastotal = document.getElementById("saidas-total")

selectYear.addEventListener('change', () => {
  if (selectYear.options[selectYear.selectedIndex].text == '2024') {
    console.log("primeiro teste")
    if (selectMonth.options[selectMonth.selectedIndex].text == 'Janeiro') {
      dados = janeiro2024;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Fevereiro') {
      dados = fevereiro2024;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Março') {
      dados = marco2023;
    }
  } else if (selectYear.options[selectYear.selectedIndex].text == '2023') {
    if (selectMonth.options[selectMonth.selectedIndex].text == 'Julho') {
      dados = julho2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Agosto') {
      dados = agosto2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Setembro') {
      dados = setembro2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Outubro') {
      dados = outubro2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Novembro') {
      dados = novembro2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Dezembro') {
      dados = dezembro2023;
    }
  }

  options_spending['series'][0]['data'] = dados['gastos gerais']
  options_spending['xaxis']['categories'] = dados['categorias gerais']
  options_area['series'][0]['data'] = dados[cost_area]
  options_area['xaxis']['categories'] = dados[area]
  options_entries['series'] = dados['valor entradas']
  options_entries['labels'] = dados['entradas']
  
  saldoinicial.innerHTML = 'R$ ' + String((dados['saldoInicial']/1000).toFixed(2)).replace('.', ',') + " mil"
  saldofinal.innerHTML = 'R$ ' + String((dados['saldoFinal']/1000).toFixed(2)).replace('.', ',') + " mil"
  entradastotal.innerHTML = 'R$ ' + String((dados['totalEntradas']/1000).toFixed(2)).replace('.', ',') + " mil"
  saidastotal.innerHTML = 'R$ -' + String((dados['totalSaidas']/1000).toFixed(2)).replace('.', ',') + " mil"
    
  chart_areas.updateOptions(options_area)
  chart_entries.updateOptions(options_entries)
  chart.updateOptions(options_spending)
})

selectMonth.addEventListener('change', () => {
  if (selectYear.options[selectYear.selectedIndex].text == '2024') {
    console.log("primeiro teste")
    if (selectMonth.options[selectMonth.selectedIndex].text == 'Janeiro') {
      dados = janeiro2024;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Fevereiro') {
      dados = fevereiro2024;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Março') {
      dados = marco2023;
    }
  } else if (selectYear.options[selectYear.selectedIndex].text == '2023') {
    if (selectMonth.options[selectMonth.selectedIndex].text == 'Julho') {
      dados = julho2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Agosto') {
      dados = agosto2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Setembro') {
      dados = setembro2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Outubro') {
      dados = outubro2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Novembro') {
      dados = novembro2023;
    } else if (selectMonth.options[selectMonth.selectedIndex].text == 'Dezembro') {
      dados = dezembro2023;
    }
  }
  if (dados['projetos'].length > 10) {
    options_area['xaxis']['labels']['rotate'] = -40;
  } else {
    options_area['xaxis']['labels']['rotate'] = -30;
  }
    

  options_spending['series'][0]['data'] = dados['gastos gerais']
  options_spending['xaxis']['categories'] = dados['categorias gerais']
  options_area['series'][0]['data'] = dados[cost_area]
  options_area['xaxis']['categories'] = dados[area]
  options_entries['series'] = dados['valor entradas']
  options_entries['labels'] = dados['entradas']

  console.log(dados['saldoInicial'])

  saldoinicial.innerHTML = 'R$ ' + String((dados['saldoInicial']/1000).toFixed(2)).replace('.', ',') + " mil"
  saldofinal.innerHTML = 'R$ ' + String((dados['saldoFinal']/1000).toFixed(2)).replace('.', ',') + " mil"
  entradastotal.innerHTML = 'R$ ' + String((dados['totalEntradas']/1000).toFixed(2)).replace('.', ',') + " mil"
  saidastotal.innerHTML = 'R$ -' + String((dados['totalSaidas']/1000).toFixed(2)).replace('.', ',') + " mil"
    
  chart_areas.updateOptions(options_area)
  chart_entries.updateOptions(options_entries)
  chart.updateOptions(options_spending)
})

var project_button = document.getElementById("button-projects")
var zelas_button = document.getElementById("button-zelas")
var contracts_button = document.getElementById("button-contracts")
var adm_button = document.getElementById("button-adm")
var title_per_area = document.getElementById("title-per-area")


project_button.addEventListener('click', () => {
  cost_area = 'custos projetos'
  area = 'projetos'

  console.log(dados['custos projetos'])

  options_area['series'][0]['data'] = dados['custos projetos'];
  options_area['xaxis']['categories'] = dados['projetos'];

  title_per_area.innerHTML = "Gastos de Projetos"

  chart_areas.updateOptions(options_area)
})

zelas_button.addEventListener('click', () => {
  cost_area = 'custos zeladoria'
  area = 'zeladoria'

  options_area['series'][0]['data'] = dados['custos zeladoria'];
  options_area['xaxis']['categories'] = dados['zeladoria'];

  title_per_area.innerHTML = "Gastos de Zeladoria"

  chart_areas.updateOptions(options_area)
})

contracts_button.addEventListener('click', () => {
  cost_area = 'custos contratos'
  area = 'contratos'

  options_area['series'][0]['data'] = dados['custos contratos'];
  options_area['xaxis']['categories'] = dados['contratos'];

  title_per_area.innerHTML = "Gastos de Contratos"

  chart_areas.updateOptions(options_area)
})

adm_button.addEventListener('click', () => {
  cost_area = 'custos adm'
  area = 'administracao'

  console.log(dados[cost_area])

  options_area['series'][0]['data'] = dados["custos adm"];
  options_area['xaxis']['categories'] = dados["administracao"];

  title_per_area.innerHTML = "Gastos de Administração"

  chart_areas.updateOptions(options_area)
})

var options_spending = {
  series: [{
      name: 'Gastos',
      data: dados['gastos gerais']
      
  }],
    chart: {
    type: 'bar',
    height: 'auto',
    width: '500px',
    colors:['#f8c300']
  },
  colors: ['#f8c300'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '90%',
      endingShape: 'rounded',
    },
    colors:['#f8c300']
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: "Gastos Gerais",
    align: 'center',
    offsetY: 15,
    style: {
      color: 'white',
      fontSize: '14px'
    }
  },
  stroke: {
    show: false,
    width: 5,
    colors: ['transparent']
  },
  legend: {
    show: true
  },
  xaxis: {
    categories: dados['categorias gerais'],
    labels: {
      rotate: -30,
      style: {
        fontSize: "8px",
        colors: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
        fontFamily: "Roboto, sans-serif" ,
      }
    }
  },
  yaxis: {
    title: {
      text: 'R$',
      style: {
        color: '#fff'
      }
    },
    labels: {
      formatter: function (val) {
        return val.toFixed(0);
      },
      style: {
        colors:['#fff']
      }
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "R$ " + String(val).replace('.', ',')
      }
    }
  },
  responsive: [
    {
      breakpoint: 1400,
      options: {
        chart: {
          width: '400px'
        }
      }
    }
  ],
  noData: {
    text: 'Selecione um ano e mês',
  }
  };



  var options_area = {
    series: [{
        name: 'Gastos',
        data: dados['custos projetos']
        
    }],
      chart: {
      type: 'bar',
      height: 'auto',
      width: '600px',
      colors:['#f8c300']
    },
    colors: ['#f8c300'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '90%',
        endingShape: 'rounded',
      },
      colors:['#f8c300']
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      width: 5,
      colors: ['transparent']
    },
    legend: {
      show: true
    },
    xaxis: {
      categories: dados['projetos'],
      labels: {
        rotate: -30,
        style: {
          fontSize: "8px",
          colors: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
          fontFamily: "Roboto, sans-serif" ,
        }
      }
    },
    yaxis: {
      title: {
        text: 'R$',
        style: {
          color: '#fff'
        }
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
        style: {
          colors:['#fff']
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "R$ " + String(val).replace('.', ',')
        }
      }
    },
    responsive: [
      {
        breakpoint: 1280,
        options: {
          chart: {
            width: '400px'
          }
        }
      }
    ],
    noData: {
      text: 'Selecione um ano e mês',
    }
    };




var options_entries = {
      series: dados['valor entradas'],
      chart: {
      width: 450,
      type: 'pie',
      },
      legend: {
        position: 'bottom',
        color: ['#fff'],
        style: {
          colors:['#fff'],
        },
        labels: {
          colors:['#fff', '#fff', '#fff', '#fff', '#fff']
        }
      },
    labels: dados['entradas'],
    responsive: [{
      breakpoint: 1000,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom',
          styel: {
            color:'#fff',
          }
        }
      }
    }]
};


var chart_entries = new ApexCharts(document.querySelector("#entries-pie-chart"), options_entries);
chart_entries.render();


var chart_areas = new ApexCharts(document.querySelector("#column-chart-area"), options_area);
chart_areas.render()

var chart = new ApexCharts(document.querySelector("#column-chart-spendings"), options_spending);
chart.render();