import React from 'react';
import ReactECharts from 'echarts-for-react';

interface PieChartProps {
  title: string;
  data: { value: number; name: string }[];
  style?: React.CSSProperties; // Optional style prop
}

const PieChart: React.FC<PieChartProps> = ({ title, data, style }) => {
  const option = {
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Data',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px", ...style }} />;
};

export default PieChart;