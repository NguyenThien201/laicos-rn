import { ITransaction, ITransactionGroup, IWallet } from "./type"

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
]

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
		icon: require("./Assets/Images/Icons/ic_clothes.png"),
		type: "SPEND",
		parent: 5,
	},
	{
		id: 7,
		name: "Giày dép",
		icon: require("./Assets/Images/Icons/ic_shoes.png"),
		type: "SPEND",
		parent: 5,
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
	{
		id: 14,
		name: "Được tặng",
		icon: require("./Assets/Images/Icons/ic_cash.png"),
		type: "EARN",
		parent: null,
	},
	{
		id: 15,
		name: "Thưởng",
		icon: require("./Assets/Images/Icons/ic_bonus.png"),
		type: "EARN",
		parent: null,
	},
]

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
]
export const lineChartData = {
	labels: ["T3", "T4", "T5", "T6", "T7"],
	datasets: [
		{
			data: [0, 1, 1, 1, 0],
			color: () => `rgba(255, 255, 255, 1)`, // optional
			strokeWidth: 3, // optional
		},
		{
			data: [8, 5, 6, 8, 4],
			color: () => `rgba(243, 74, 47, 1)`, // optional
			strokeWidth: 3, // optional
		},
		{
			data: [10, 10, 10, 15, 15],
			color: () => `rgba(60, 211, 173, 1)`, // optional
			strokeWidth: 3, // optional
		},
	],
	legend: ["Vay", "Chi", "Thu"], // optional
}
export const stackedBarChartData = {
	labels: ["T3", "T4", "T5", "T6", "T7"],
	legend: ["Vay", "Chi", "Thu"],
	data: [
		[0, 8, 10],
		[1, 5, 10],
		[1, 6, 10],
		[1, 8, 15],
		[0, 4, 15],
	],
	barColors: [`rgba(255, 255, 255, 1)`, `rgba(243, 74, 47, 1)`, `rgba(60, 211, 173, 1)`]
}
export const chartConfig = {
	backgroundGradientFrom: "#151321",
	backgroundGradientTo: "#151321",
	color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	strokeWidth: 2, // optional, default 3
	barPercentage: 0.5,
}
export const spendingData = [
	{
		name: "Ăn uống",
		money: 21500000,
		color: "rgba(131, 167, 234, 1)",
		legendFontColor: "white",
		legendFontSize: 13
	},
	{
		name: "Tiền nhà",
		money: 2800000,
		color: "#F00",
		legendFontColor: "white",
		legendFontSize: 13
	},
	{
		name: "Xe cộ",
		money: 8538000,
		color: "#ffffff",
		legendFontColor: "white",
		legendFontSize: 13
	},
	{
		name: "Đi chơi",
		money: 11920000,
		color: "rgb(0, 0, 255)",
		legendFontColor: "white",
		legendFontSize: 13
	}
]