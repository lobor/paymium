import React from "react";
import { Transaction } from "../type";
import Triangle from "./Triangle";

interface ItemTransactionProps {
  /** Transaction for showing in line */
  transaction: Transaction;
  /** Add background if true */
  hasSelected?: boolean;
  /** event when click on item */
  onClick?: (transaction: Transaction) => void;
}

/** Transaction line in table */
const ItemTransaction = ({
  transaction,
  hasSelected,
  onClick,
}: ItemTransactionProps) => {
  const {
    id,
    created_at,
    counterparty_name,
    operation_type,
    amount,
    attachements,
    currency,
    debit,
    credit,
  } = transaction;
  const isAsc = debit === "false" && credit === "true";
  return (
    <div
      key={id}
      className={`flex flex-row py-5 border-b cursor-pointer ${
        hasSelected && "bg-gray-400"
      }`}
      onClick={() => onClick && onClick(transaction)}
    >
      <div className="flex-1">{created_at}</div>
      <div className="flex-1">{counterparty_name}</div>
      <div className="flex-1">{operation_type}</div>
      <div className="flex-1 flex flex-row items-center">
        {Number(amount) > 0 ? `+ ${amount}` : amount} {currency}{" "}
        <Triangle
          color={isAsc ? "green": "red"}
          sort={isAsc ? "asc" : "desc"}
        />
      </div>
      <div className="w-10">
        <span className="inline-block ">&#128206;</span>
        {attachements.length}
      </div>
    </div>
  );
};

export default ItemTransaction;
