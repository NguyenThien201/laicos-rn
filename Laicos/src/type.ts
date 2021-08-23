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
  group?: ITransactionGroup | null;
  money?: number;
  date: Date;
  description: string;
  wallet: string; // Trỏ sang tên của wallet
  images?: IImage[];
}

export function parseITransactionObject(json: JSON): ITransaction {
  return {
    date: new Date(json["date"]),
    description: json["description"],
    wallet: json["wallet"],
    money: json["money"],
    group: json["group"],
    images: json["images"],
  };
}

export interface ITransactionByDay {
  date: Date;
  transactionItems: ITransaction[];
}

export interface INotification {
  content: string;
  date: Date;
}


export interface IPlanner{
  name: string,
  money: number;
  dateStart: Date;
  dateEnd: Date;
  wallet: string; // Trỏ sang tên của wallet
  group: ITransactionGroup,
  [key:string]:any
}

export interface StatisticData {
  parentName?: string;
  parentId?: number;
  parentIcon?: string;
  money?: number;
  type?: TTransactionType;
  childs: any[];
}
