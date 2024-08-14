import { ArrowUpward, ArrowDownward, SwapVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface SortingComponentProps {
  isActiveSort: boolean;
  currentOrder: "asc" | "desc";
  handleSortChange: () => void;
}

const SortingComponent = ({
  isActiveSort,
  currentOrder,
  handleSortChange,
}: SortingComponentProps) => {
  return (
    <IconButton onClick={handleSortChange}>
      {isActiveSort ? (
        currentOrder === "asc" ? (
          <ArrowUpward fontSize="small" color="primary" />
        ) : (
          <ArrowDownward fontSize="small" color="primary" />
        )
      ) : (
        <SwapVert fontSize="small" />
      )}
    </IconButton>
  );
};

export default SortingComponent;
