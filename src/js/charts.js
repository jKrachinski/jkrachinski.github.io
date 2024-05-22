import database from '../database/database.json' with {type: "json"};
import inadimplencia from '../database/inadimplencia.json' with {type: "json"}

var dados = database['2024']['Janeiro']
var selectMonth = document.getElementById("select-month")
var selectYear = document.getElementById("select-year")
var area = 'projetos'
var cost_area = 'custos projetos'

var saldoinicial = document.getElementById("saldo-inicial")
var saldofinal = document.getElementById("saldo-final")
var entradastotal = document.getElementById("entradas-total")
var saidastotal = document.getElementById("saidas-total")


//whenever the user changes the listed year, changes the data to represent the first month of that year
selectYear.addEventListener('change', () => {
  dados = database[selectYear.options[selectYear.selectedIndex].text][selectMonth.options[selectMonth.selectedIndex].text];

  //0 defines the first year
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

//same thing as the year, but now whenever the month changes
selectMonth.addEventListener('change', () => {
  dados = database[selectYear.options[selectYear.selectedIndex].text][selectMonth.options[selectMonth.selectedIndex].text];

  //changes project text rotation based on the length of the project
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

//changes the area graph to list projetos 
project_button.addEventListener('click', () => {
  cost_area = 'custos projetos'
  area = 'projetos'

  console.log(dados['custos projetos'])

  options_area['series'][0]['data'] = dados['custos projetos'];
  options_area['xaxis']['categories'] = dados['projetos'];

  title_per_area.innerHTML = "Gastos de Projetos"

  chart_areas.updateOptions(options_area)
})

//changes the area grpah to list zeladoria
zelas_button.addEventListener('click', () => {
  cost_area = 'custos zeladoria'
  area = 'zeladoria'

  options_area['series'][0]['data'] = dados['custos zeladoria'];
  options_area['xaxis']['categories'] = dados['zeladoria'];

  title_per_area.innerHTML = "Gastos de Zeladoria"

  chart_areas.updateOptions(options_area)
})

//changes the area graph to list contratos
contracts_button.addEventListener('click', () => {
  cost_area = 'custos contratos'
  area = 'contratos'

  options_area['series'][0]['data'] = dados['custos contratos'];
  options_area['xaxis']['categories'] = dados['contratos'];

  title_per_area.innerHTML = "Gastos de Contratos"

  chart_areas.updateOptions(options_area)
})

//changes the area graph to administração
adm_button.addEventListener('click', () => {
  cost_area = 'custos adm'
  area = 'administracao'

  console.log(dados[cost_area])

  options_area['series'][0]['data'] = dados["custos adm"];
  options_area['xaxis']['categories'] = dados["administracao"];

  title_per_area.innerHTML = "Gastos de Administração"

  chart_areas.updateOptions(options_area)
})

//defines the options for the general spendings graph
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


//defines the graphic options for the area spendings
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



//defines the graphic options for the entries piechart
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

//grafico do numero de inadimplentes por boleto
var options_numero_boletos = {
  series: [inadimplencia['n_devendo']['1-3'], inadimplencia['n_devendo']['4-6'], inadimplencia['n_devendo']['7-9'], inadimplencia['n_devendo']['10+']],
  chart: {
  width: 450,
  type: 'pie',
  },
  title: {
    text: "Quantidade de inadimplentes por numero de boletos não pagos",
    align: 'center',
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white'
    }
  },
  legend: {
    position: 'left',
    verticalAlign:'center',
    color: ['#fff'],
    style: {
      colors:['#fff'],
    },
    labels: {
      colors:['#fff', '#fff', '#fff', '#fff', '#fff']
    }
  },
  labels: ['1-3', '4-6', '7-9', '10+'],
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
      },
      title: {
        style: {
          fontSize: "9px",
        },
      },
    }
  }]
};

//grafico de boletos por turma
var options_inadimplencia_turma = {
  series: Object.values(inadimplencia['turmas']),
  chart: {
  width: 450,
  type: 'pie',
  },
  title: {
    text: "Boletos não pagos por turma",
    align: 'center',
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white'
    }
  },
  legend: {
    position: 'left',
    color: ['#fff'],
    style: {
      colors:['#fff'],
    },
    labels: {
      colors:['#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
    }
  },
  labels: Object.keys(inadimplencia['turmas']),
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

var chart_numero_boletos = new ApexCharts(document.querySelector("#pie-chart-numero-boletos"), options_numero_boletos);
chart_numero_boletos.render();

var chart_turma = new ApexCharts(document.querySelector("#pie-chart-p-turma"), options_inadimplencia_turma);
chart_turma.render();

var chart_areas = new ApexCharts(document.querySelector("#column-chart-area"), options_area);
chart_areas.render()

var chart = new ApexCharts(document.querySelector("#column-chart-spendings"), options_spending);
chart.render();