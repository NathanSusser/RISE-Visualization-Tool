

//https://developers.google.com/apps-script/chart-configuration-options
function graph1(){}
function createChart(sheet,title,xaxis,yaxis,chartType,numHeaders=1,ranges=null,stacked=true,verticalaxis=null){
  var range = sheet.getRange("A1").getDataRegion()
  height = range.getHeight()
  //if a chart is already there remove it and add another one
  if (sheet.getCharts().length>0){
    var chart = sheet.getCharts()[0];
    sheet.removeChart(chart)
  }
  //Create embedded sheet chart 
  var chart = sheet.newChart()
  .setChartType(chartType)
  .setOption('title', title)
  .setNumHeaders(numHeaders)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
  .setPosition(5, 5, 0, 0)
  .setOption('width', 700)
  .setOption('height', 500)
  .setOption('hAxis',{title:xaxis})
  .setOption('vAxis',{title:yaxis})
  .setOption('isStacked', stacked.toString())

  //Add specific ranges if the ranges are not null. otherwise use the entire sheet in the table
  if (ranges !=null){
    for (var r=0;r<ranges.length;r++){
      chart = chart.addRange(sheet.getRange(ranges[r]))
    }
  }else{
    chart = chart.addRange(range)
  }
  if (verticalaxis!=null){
    chart = chart
    .asColumnChart()
    chart.setRange(verticalaxis.min,verticalaxis.max)
  }
  chart = chart.build()
  
  sheet.insertChart(chart);
  return chart;
}


