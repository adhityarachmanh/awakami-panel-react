import React from "react";
import ReactECharts from "echarts-for-react";

const BarChart = ({
  data,
  categories,

  title,

  style, // Add style to the props
}: {
  data: number[];
  categories: string[];
  title: string;
  style?: React.CSSProperties; // Define the type for style
}) => {
  const option = {
    title: {
      text: title,
    },
    tooltip: {},

    xAxis: {
      data: categories,
    },
    yAxis: {},

    series: [
      {
        type: "bar",

        data: data,
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "400px", ...style }} /> // Merge the style prop
  );
};

export default BarChart;
