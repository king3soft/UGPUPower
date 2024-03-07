import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Theme from "highcharts/themes/brand-dark";
Theme(Highcharts);

const PowerChart = (props) => (
  <HighchartsReact
    // style={{ height: '1000px'}}

    containerProps={{
      style: { height: "50%" },
    }}
    highcharts={Highcharts}
    options={{
      credits: {
        enabled: false,
      },
      title: {
        text: props?.title || "Unkown",
        floating: false,
        align: "left",
        // x: 0,
        // y: 30
      },
      chart: {
        type: "line",
        // backgroundColor: '#333333',
        // zoomType: "x",
        // borderColor: "lightgray",
        // borderWidth: 1,
        // plotBorderWidth: 1,
        // margin: [5, 5, 5, 5]
      },
      accessibility: {
        enabled: false
      },
      xAxis: props.options.xAxis,
      // {
      //   crosshair: true,
      // type: "datetime",
      // dateTimeLabelFormats: {
      //   millisecond: "%H:%M:%S.%L",
      //   second: "%H:%M:%S",
      //   minute: "%H:%M",
      //   hour: "%H:%M",
      //   day: "%m-%d",
      //   week: "%m-%d",
      //   month: "%Y-%m",
      //   year: "%Y",
      // },
      //   max: 2,
      //   min: 0
      // },
      // tooltip: {
      //   formatter: function () {
      //     var s = "<b>" + this.series.name + "</b><br />";
      //     s += "<b>" + (this.y / 1024).toFixed(1) + "mb</b>";
      //     return s;
      //   },
      // },
      yAxis: props.options.yAxis,
      // yAxis: {
      //   title: {
      //     text: "",
      //   },
      //   labels: {
      //     formatter: function () {
      //       return (this.value / 1024).toFixed(1) + "mb";
      //     },
      //   },
      //   lineWidth: 0.5,
      //   max: 70,
      //   min: 0
      // },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      plotOptions: {
        series: {
          animation: true,
        },
      },
      series: props.options.series,
    }}
  />
);

export default PowerChart;
