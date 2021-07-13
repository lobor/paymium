import { FC } from "react";
import Triangle from "./Triangle";

export interface CellHeaderTransactionProps {
  /** Is unique key for sorting */
  accessor: string;
  /** Component to show */
  label: React.ReactNode;
  /** Event when click on component */
  onClick?: (key: string) => void;
  /**
   * Sorting options for showing sorting
   */
  sorting?: { key: string; sort: "asc" | "desc" } | undefined;
}

/**
 * Cell of header in table transaction with sorting implementation
 */
const CellHeaderTransaction: FC<CellHeaderTransactionProps> = ({
  sorting,
  label,
  accessor,
  onClick,
}) => {
  return (
    <div
      className="flex-1 cursor-pointer py-3 flex flex-row items-center"
      onClick={() => onClick && onClick(accessor)}
    >
      {label}
      {sorting && sorting.key === accessor && (
        <Triangle color="yellow" sort={sorting.sort} />
      )}
    </div>
  );
};

export default CellHeaderTransaction;
