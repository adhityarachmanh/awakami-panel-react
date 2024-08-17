import DataTable from "@/components/table";
import { Card, CardContent } from "@mui/material";
import useListEvent from "./useListEvent";

const ListEvent = () => {
  const { columns, service, handleAddButtonClick, uniqKey } = useListEvent();
  return (
    <div className=" wd-flex wd-flex-col wd-gap-4 wd-w-full wd-container wd-mx-auto wd-mt-[11rem] wd-px-4">
      <Card>
        <CardContent>
          <DataTable
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

export default ListEvent;
