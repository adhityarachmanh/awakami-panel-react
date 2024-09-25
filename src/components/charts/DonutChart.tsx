import React from "react";
import ReactECharts from "echarts-for-react";

interface DonutChartProps {
  data: { name: string; value: number }[];
  title?: string;
  style?: React.CSSProperties;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, title, style }) => {
  const option = {
   
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Data',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data.map((item) => ({ value: item.value, name: item.name }))
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: "400px", ...style }} />;
};

export default DonutChart;