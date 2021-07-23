

export interface IWallet {
    name: string,
    moneyIn: number,
    moneyOut: number
}

export type TTransactionType = "LOAN" | "EARN" | "SPEND"

// Nhóm chi tiêu
export interface ITransactionGroup 
{
    id: number,
    name: string,
    icon: string,
    type: TTransactionType,
    parent: number | null
}
export interface ITransaction {
    group: ITransactionGroup,
    money: number,
    date: Date,
    description: string,
    wallet: string // Trỏ sang tên của wallet
}