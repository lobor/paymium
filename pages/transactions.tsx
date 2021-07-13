import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import natsort from "natsort";
import instanceAxios from "../modules/fetch";
import Head from "next/head";
import { Transaction } from "../type";
import ItemTransaction from "../components/ItemTransaction";
import CellHeaderTransaction from "../components/CellHeaderTransaction";

export interface TransactionsProps {
  /**
   * List of transactions
   */
  transactions: Transaction[];
}

export interface TransactionsState {
  key: string;
  sort: "asc" | "desc";
  data: Transaction[];
}

/**
 * Show all transaction of client
 */
const Transactions = ({ transactions }: TransactionsProps) => {
  const shiftControl = useRef<boolean>(false);
  const [selected, setSelected] = useState<Transaction[]>([]);
  const [sorting, setSorting] = useState<TransactionsState>({
    key: "created_at",
    sort: "asc",
    data: transactions,
  });

  const handleSort = useCallback(
    (key: string) => {
      const newSort = sorting.sort === "asc" ? "desc" : "asc";
      const sorter = natsort({ desc: newSort === "desc" });
      const sortTmp: TransactionsState = {
        ...sorting,
        sort: newSort,
        key,
        data: sorting.data.sort((a, b) =>
          sorter((a as any)[key], (b as any)[key])
        ),
      };
      setSorting(sortTmp);
    },
    [sorting]
  );

  const handleClickTransaction = (transaction: Transaction) => {
    const hasSelected = selected.find(({ id }) => id === transaction.id);
    if (!shiftControl.current) {
      setSelected([transaction]);
      return;
    }
    if (hasSelected) {
      setSelected(selected.filter(({ id }) => id !== transaction.id));
    } else {
      setSelected([...((shiftControl.current && selected) || []), transaction]);
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      shiftControl.current = true;
    }
  };
  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      shiftControl.current = false;
    }
  };

  useEffect(() => {
    if (process.browser) {
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("keyup", handleKeyup);
      return () => {
        document.removeEventListener("keydown", handleKeydown);
        document.removeEventListener("keyup", handleKeyup);
      };
    }
  }, []);

  const headerRender = useMemo(() => {
    return (
      <div className="flex flex-row border-b">
        <CellHeaderTransaction
          accessor="created_at"
          sorting={sorting}
          onClick={handleSort}
          label="Date"
        />
        <CellHeaderTransaction
          accessor="counterparty_name"
          sorting={sorting}
          onClick={handleSort}
          label="Counterparty Name"
        />
        <CellHeaderTransaction
          accessor="operation_type"
          sorting={sorting}
          onClick={handleSort}
          label="Payment type"
        />
        <CellHeaderTransaction
          accessor="amount"
          sorting={sorting}
          onClick={handleSort}
          label="Amount"
        />
        <div className="w-10">&#128206;</div>
      </div>
    );
  }, [handleSort, sorting]);

  return (
    <>
      <Head>
        <title>Transactions (3) - FINPAL</title>
        <meta name="description" content="Transactions (3) - FINPALM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-1 justify-center mt-10">
        <div className="w-4/5 px-5">
          {headerRender}
          {sorting.data.map((transaction) => (
            <ItemTransaction
              key={transaction.id}
              hasSelected={Boolean(
                selected.find(({ id }) => id === transaction.id)
              )}
              transaction={transaction}
              onClick={handleClickTransaction}
            />
          ))}
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
    </>
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
