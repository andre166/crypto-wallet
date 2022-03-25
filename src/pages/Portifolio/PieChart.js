import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  credits: {
    enabled: false,
    // innerHeight: "100%",
  },
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    // style: {
    //   width: "10%",
    //   height: "100%",
    //   position: "relative",
    // },
  },
  title: {
    text: "",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },

  series: [
    {
      name: "Brands",
      colorByPoint: true,
      data: [
        {
          name: "Bitcoin",
          y: 61.41,
          sliced: true,
          selected: true,
        },
        {
          name: "Ethereum",
          y: 11.84,
        },
        {
          name: "Tether",
          y: 10.85,
        },
        {
          name: "Xrp",
          y: 4.67,
        },
        {
          name: "Avalanche",
          y: 4.18,
        },
        {
          name: "Shib",
          y: 7.05,
        },
      ],
    },
  ],
};

const PieChart = () => (
  <HighchartsReact
    allowChartUpdate
    highcharts={Highcharts}
    options={options}
    containerProps={{
      style: {
        // background: "red",
        height: "100%",
        position: "relative",
      },
    }}
  />
);

export default PieChart;
