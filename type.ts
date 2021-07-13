export interface Transaction {
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

export type FieldSortable =
  | "created_at"
  | "counterparty_name"
  | "amount"
  | "operation_type";
