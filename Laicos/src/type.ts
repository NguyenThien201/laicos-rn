export interface IWallet {
  name: string;
  moneyIn: number;
  moneyOut: number;
}

export type TTransactionType = "LOAN" | "EARN" | "SPEND";

// Nhóm chi tiêu
export interface ITransactionGroup {
  id: number;
  name: string;
  icon: string;
  type: TTransactionType;
  parent: number | null;
  children?: number[];
}

export interface IImage {
  image: string;
  title: string;
}

export interface ITransaction {
  group: ITransactionGroup;
  money: number;
  date: Date;
  description: string;
  wallet: string; // Trỏ sang tên của wallet
  images: IImage[];
}

export interface ITransactionByDay {
  date: Date;
  transactionItems: ITransaction[];
}
