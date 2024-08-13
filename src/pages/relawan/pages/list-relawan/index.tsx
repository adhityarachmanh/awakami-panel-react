import DataTable from "@/components/table";
import { PostQuery } from "@/types/PostQuery";
import useListRelawan from "./useListRelawan";
import { Card, CardContent } from "@mui/material";

const ListRelawan = () => {
  const { columns, testService, handleAddButtonClick } = useListRelawan();
  return (
    <div className=" wd-flex wd-flex-col wd-gap-4 wd-w-full wd-container wd-mx-auto wd-mt-[11rem] wd-px-4">
      <Card>
        <CardContent>
          <DataTable
            uniqKey="relawan"
            handleAddButtonClick={handleAddButtonClick}
            columns={columns}
            service={(postQuery: PostQuery) => {
              return testService.all(postQuery);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ListRelawan;
