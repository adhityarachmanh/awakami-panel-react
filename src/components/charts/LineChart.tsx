import React from "react";
import ReactECharts from "echarts-for-react";

interface LineChartProps {
  data: { name: string; value: number }[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  style?: React.CSSProperties;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  style,
}) => {
  const option = {
   
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.name),
      name: xAxisLabel,
    },
    yAxis: {
      type: "value",
      name: yAxisLabel,
    },
    series: [
      {
        data: data.map((item) => item.value),
        type: "line",
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px", ...style }} />;
};

export default LineChart;
