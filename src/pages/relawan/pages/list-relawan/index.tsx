import DataTable from "@/components/table";
import useListRelawan from "./useListRelawan";
import { Card, CardContent } from "@mui/material";
// import { InputFilterField } from "@/components/table/components/InputFilter";
// import defaultFilterConfigs from "@/components/table/constants/filterConfig";

const ListRelawan = () => {
  const { columns, service, handleAddButtonClick, uniqKey } = useListRelawan();

  return (
    <div className=" wd-flex wd-flex-col wd-gap-4 wd-w-full wd-container wd-mx-auto wd-mt-[11rem] wd-px-4">
      <Card>
        <CardContent>
          <DataTable
            height="500px"
            // filterConfigsCustom={[
            //   ...defaultFilterConfigs, 
            //   {
            //     label: "Custom",
            //     value: "custom",
            //     component: InputFilterField,
            //   },
              
            // ]}
            onSelectionChange={(selectedRows) => {
              // console.log(selectedRows);
            }}
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

export default ListRelawan;
