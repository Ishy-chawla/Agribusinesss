// Our labels along the x-axis
var Months = ["January","February","March","April","May","June","July","August"];
// For drawing the lines
var Rain = [50,110,80,105,200,220,225,350];
var Temp = [20,21,22,12,14,18,23,25];


var States = ["New south Wales","Western Australia","Queens Land","Victoria","South Australia","Tasmania"];
// For drawing the lines
var Pop = [7704300,2613700,4827000,6039100,1706500,518500];
var Food = [10709000,10728000,4084000,4441000,4132000,59000];

function graph()
{
  var chosen = document.getElementById('est');
  if(chosen.value==="2")
      graph1();
  else if(chosen.value==="3")
      graph2();
  /*var chosen = document.getElementById('try');
  if(chosen.value=="1")
    graph1();
  else
    graph2();*/
}
function graph1() {  
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Months,
    datasets: [
      { 
        data: Rain,
        label: "Rainfall",
        borderColor: "#3e95cd",
        //fill: false
      },
      { 
        data: Temp,
        label: "Temprature",
        borderColor: "#8e5ea2",
        //fill: false
      }
    ]
  }
});
}

function graph2() {
    
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: States,
    datasets: [
      { 
        data: Pop,
        label: "Population",
        borderColor: "#3e95cd",
        fill: "#3e95cd"
        //fill: false
      },
      { 
        data: Food,
        label: "Food",
        borderColor: "#8e5ea2",
        //fill: false
      }]
  }
});
}