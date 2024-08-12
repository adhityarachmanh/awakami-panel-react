import { Card, CardContent } from "@mui/material";
import BarChart from "../../components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import DonutChart from "@/components/charts/DonutChart";
import PieChart from "@/components/charts/PieChart";

const HomePage = () => {
  return (
    <div className="wd-flex wd-flex-col wd-gap-4">
      <div className="wd-grid xl:wd-grid-cols-3  2xl:wd-grid-cols-6 wd-gap-4 wd-mt-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}>
            <CardContent>
              <h3 className="wd-text-2xl wd-font-bold">Card {index + 1}</h3>
              <p className="wd-text-base">Some content here...</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="wd-grid md:wd-grid-cols-4 wd-grid-cols-1 wd-p-4">
        <BarChart
          data={[5, 20, 36, 10]}
          categories={["category1", "category2", "category3", "category4"]}
          title="Bar Chart Example"
        />
        <LineChart
          data={[
            { name: "category1", value: 5 },
            { name: "category2", value: 20 },
            { name: "category3", value: 36 },
            { name: "category4", value: 10 },
          ]}
          xAxisLabel="Category"
          yAxisLabel="Value"
          title="Line Chart Example"
        />
        <DonutChart
          data={[
            { name: "category1", value: 5 },
            { name: "category2", value: 20 },
            { name: "category3", value: 36 },
            { name: "category4", value: 10 },
          ]}
          title="Donut Chart Example"
        />
        <PieChart
          data={[
            { name: "category1", value: 5 },
            { name: "category2", value: 20 },
            { name: "category3", value: 36 },
            { name: "category4", value: 10 },
          ]}
          title="Pie Chart Example"
        />
      </div>
    </div>
  );
};

export default HomePage;
