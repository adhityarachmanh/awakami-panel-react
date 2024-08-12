import DataTable from "@/components/table";
import { PostQuery } from "@/types/PostQuery";
import useListRelawan from "./useListRelawan";

const ListRelawan = () => {
  const { columns, testService, handleAddButtonClick } = useListRelawan();
  return (
    <div>
      <DataTable
        uniqKey="relawan"
        handleAddButtonClick={handleAddButtonClick}
        columns={columns}
        service={(postQuery: PostQuery) => {
          return testService.getPagination(postQuery);
        }}
      />
    </div>
  );
};

export default ListRelawan;
