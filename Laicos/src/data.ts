import { ITransaction, ITransactionGroup, IWallet } from "./type";

export const wallets: IWallet[] = [
	{
		name: "BAMEBANK",
		moneyIn: 600000,
		moneyOut: 500000,
	},
	{
		name: "NGUOIYEUBANK",
		moneyIn: 750000,
		moneyOut: 100000,
	},
	{
		name: "BODUONGBANK",
		moneyIn: 100000000,
		moneyOut: 5000000,
	},
];

export const transactionGroup: ITransactionGroup[] = [
	{
		id: 2,
		name: "Ăn uống",
		icon: require("./Assets/Images/Icons/ic_meal.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 3,
		name: "Nhà hàng",
		icon: require("./Assets/Images/Icons/ic_coffee.png"),
		type: "SPEND",
		parent: 2,
	},
	{
		id: 4,
		name: "Cà phê",
		icon: require("./Assets/Images/Icons/ic_coffee.png"),
		type: "SPEND",
		parent: 3,
	},
	{
		id: 5,
		name: "Mua sắm",
		icon: require("./Assets/Images/Icons/ic_shopping.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 6,
		name: "Quần áo",
		icon: "",
		type: "SPEND",
		parent: 5,
	},
	{
		id: 7,
		name: "Giày dép",
		icon: "",
		type: "SPEND",
		parent: 3,
	},
	{
		id: 8,
		name: "Lương",
		icon: require("./Assets/Images/Icons/ic_salary.png"),
		type: "EARN",
		parent: null,
	},
	{
		id: 9,
		name: "Giáo dục",
		icon: require("./Assets/Images/Icons/ic_education.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 10,
		name: "Giải trí",
		icon: require("./Assets/Images/Icons/ic_entertainment.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 11,
		name: "Di chuyển",
		icon: require("./Assets/Images/Icons/ic_transport.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 12,
		name: "Du lịch",
		icon: require("./Assets/Images/Icons/ic_travel.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 13,
		name: "Hẹn hò",
		icon: require("./Assets/Images/Icons/ic_dating.png"),
		type: "SPEND",
		parent: null,
	},
];

export const transaction: ITransaction[] = [
	{
		group: transactionGroup[0],
		money: 100000,
		date: new Date("06/06/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[1],
		money: 10000000,
		date: new Date("06/07/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[3],
		money: 70000,
		date: new Date("06/05/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[3],
		money: 20000,
		date: new Date("06/04/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[7],
		money: 1000000,
		date: new Date("06/01/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[3],
		money: 10000000,
		date: new Date("05/05/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
];
