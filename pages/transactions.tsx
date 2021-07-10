import { useState } from "react";
import natsort from "natsort";
import instanceAxios from "../modules/fetch";

interface Transaction {
  id: string;
  created_at: string;
  counterparty_name: string;
  debit: string;
  credit: string;
  amount: string;
  currency: string;
  operation_type: string;
  attachements: {
    url: string;
  }[];
}
interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions = ({ transactions }: TransactionsProps) => {
  const [selected, setSelected] = useState<Transaction[]>([]);
  const [sorting, setSorting] = useState({
    key: "created_at",
    sort: "asc",
    data: transactions,
  });

  const handleSort = (key: string) => () => {
    if (key !== "attachements") {
      const newSort = sorting.sort === "asc" ? "desc" : "asc";
      const sorter = natsort({ desc: newSort === "desc" });
      const sortTmp = {
        ...sorting,
        sort: newSort,
        key,
        data: sorting.data.sort((a, b) => sorter(a[key], b[key])),
      };
      setSorting(sortTmp);
    }
  };

  const handleClickTransaction = (transaction: Transaction) => () => {
    const hasSelected = selected.find(({ id }) => id === transaction.id);
    if (hasSelected) {
      setSelected(selected.filter(({ id }) => id !== transaction.id));
    } else {
      setSelected([...selected, transaction]);
    }
  };

  return (
    <div className="flex flex-1 justify-center mt-10">
      <div className="w-4/5 px-5">
        <div className="flex flex-row border-b">
          <div
            className="flex-1 cursor-pointer py-3 flex flex-row items-center"
            onClick={handleSort("created_at")}
          >
            Date
            {sorting.key === "created_at" && (
              <span
                className={`triangle triangle-yellow ml-2 ${
                  sorting.sort === "desc" && "transform rotate-180"
                }`}
              ></span>
            )}
          </div>
          <div
            className="flex-1 cursor-pointer py-3 flex flex-row items-center"
            onClick={handleSort("counterparty_name")}
          >
            Counterparty Name
            {sorting.key === "counterparty_name" && (
              <span
                className={`triangle triangle-yellow ml-2 ${
                  sorting.sort === "desc" && "transform rotate-180"
                }`}
              ></span>
            )}
          </div>
          <div
            className="flex-1 cursor-pointer py-3 flex flex-row items-center"
            onClick={handleSort("operation_type")}
          >
            Payment type
            {sorting.key === "operation_type" && (
              <span
                className={`triangle triangle-yellow ml-2 ${
                  sorting.sort === "desc" && "transform rotate-180"
                }`}
              ></span>
            )}
          </div>
          <div
            className="flex-1 cursor-pointer py-3 flex flex-row items-center"
            onClick={handleSort("amount")}
          >
            Amount
            {sorting.key === "amount" && (
              <span
                className={`triangle triangle-yellow ml-2 ${
                  sorting.sort === "desc" && "transform rotate-180"
                }`}
              ></span>
            )}
          </div>
          <div className="w-10">&#128206;</div>
        </div>
        <div>
          {sorting.data.map((transaction) => {
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

            const hasSelected = selected.find(
              ({ id }) => id === transaction.id
            );
            return (
              <div
                key={id}
                className={`flex flex-row py-5 border-b cursor-pointer ${
                  hasSelected && "bg-gray-400"
                }`}
                onClick={handleClickTransaction(transaction)}
              >
                <div className="flex-1">{created_at}</div>
                <div className="flex-1">{counterparty_name}</div>
                <div className="flex-1">{operation_type}</div>
                <div className="flex-1 flex flex-row items-center">
                  {Number(amount) > 0 ? `+ ${amount}` : amount} {currency}{" "}
                  <span
                    className={`triangle ml-2 ${
                      debit === "true" && "transform rotate-180 triangle-red"
                    } ${credit === "true" && "triangle-green"}`}
                  ></span>
                </div>
                <div className="w-10">
                  <span className="inline-block ">&#128206;</span>
                  {attachements.length}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-1/4 px-5">
        {selected.length === 0 && (
          <span className="text-gray-400">
            Click on one several transactions to see details
          </span>
        )}
        {selected.length === 1 && (
          <>
            <div className="flex-1">{selected[0].created_at}</div>
            <div className="flex-1">{selected[0].counterparty_name}</div>
            <div className="flex-1">{selected[0].operation_type}</div>
            <div className="flex-1 flex flex-row items-center">
              {Number(selected[0].amount) > 0
                ? `+ ${selected[0].amount}`
                : selected[0].amount}{" "}
              {selected[0].currency}{" "}
              <span
                className={`triangle ml-2 ${
                  selected[0].debit === "true" &&
                  "transform rotate-180 triangle-red"
                } ${selected[0].credit === "true" && "triangle-green"}`}
              ></span>
            </div>
          </>
        )}
        {selected.length > 1 && (
          <ul>
            {selected.map(({ id }) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await instanceAxios.get("/transactions");
  const [transactions] = data;
  return {
    props: {
      transactions: (transactions && transactions.transactions) || [],
    },
  };
}

export default Transactions;
