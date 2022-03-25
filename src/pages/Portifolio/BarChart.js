import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  credits: {
    enabled: false,
  },
  chart: {
    type: "column",
  },
  title: {
    text: "",
  },
  subtitle: {
    text: "Histórico de aportes",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    crosshair: true,
  },
  yAxis: {
    title: {
      text: "",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
      },
    },
  },

  tooltip: {
    enabled: false,

    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>',
  },

  series: [
    {
      colorByPoint: true,
      data: [
        {
          name: "Chrome",
          y: 62.74,
        },
        {
          name: "Firefox",
          y: 10.57,
          drilldown: "Firefox",
        },
        {
          name: "Internet Explorer",
          y: 7.23,
        },
        {
          name: "Safari",
          y: 5.58,
        },
        {
          name: "Edge",
          y: 4.02,
        },
        {
          name: "Opera",
          y: 1.92,
        },
        {
          name: "Other",
          y: 7.62,
        },
        {
          name: "Other",
          y: 7.62,
        },
        {
          name: "Other",
          y: 7.62,
        },
        {
          name: "Other",
          y: 7.62,
        },
        {
          name: "Other",
          y: 7.62,
        },
        {
          name: "Other",
          y: 7.62,
        },
      ],
    },
  ],
};

const BarChart = () => (
  <HighchartsReact
    allowChartUpdate
    highcharts={Highcharts}
    options={options}
    containerProps={{
      style: {
        width: "100%",
        position: "relative",
        // flex: 1,
        // padding: "2px 0px",
        height: 300,
      },
    }}
  />
);

export default BarChart;
