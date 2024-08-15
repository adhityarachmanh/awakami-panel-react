import DataTable from "@/components/table";
import { Card, CardContent } from "@mui/material";
import useListTPS from "./useListTPS";

const ListTPS = () => {
  const { columns, service, handleAddButtonClick, uniqKey } = useListTPS();
  return (
    <div className=" wd-flex wd-flex-col wd-gap-4 wd-w-full wd-container wd-mx-auto wd-mt-[11rem] wd-px-4">
      <Card>
        <CardContent>
          <DataTable
            height="500px"
            uniqKey={uniqKey}
            handleAddButtonClick={handleAddButtonClick}
            columns={columns}
            service={service}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ListTPS;
