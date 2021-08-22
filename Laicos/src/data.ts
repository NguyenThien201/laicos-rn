import { INotification, IPlanner, ITransaction, ITransactionGroup, IWallet } from "./type";

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
		id: 0,
		name: "Ăn uống",
		icon: require("./Assets/Images/Icons/ic_meal.png"),
		type: "SPEND",
		parent: null,
		children: [1, 2],
	},
	{
		id: 1,
		name: "Nhà hàng",
		icon: require("./Assets/Images/Icons/ic_coffee.png"),
		type: "SPEND",
		parent: 0,
	},
	{
		id: 2,
		name: "Cà phê",
		icon: require("./Assets/Images/Icons/ic_coffee.png"),
		type: "SPEND",
		parent: 0,
	},
	{
		id: 3,
		name: "Mua sắm",
		icon: require("./Assets/Images/Icons/ic_shopping.png"),
		type: "SPEND",
		parent: null,
		children: [4, 5],
	},
	{
		id: 4,
		name: "Quần áo",
		icon: require("./Assets/Images/Icons/ic_clothes.png"),
		type: "SPEND",
		parent: 3,
	},
	{
		id: 5,
		name: "Giày dép",
		icon: require("./Assets/Images/Icons/ic_shoes.png"),
		type: "SPEND",
		parent: 3,
	},
	{
		id: 6,
		name: "Lương",
		icon: require("./Assets/Images/Icons/ic_salary.png"),
		type: "EARN",
		parent: null,
	},
	{
		id: 7,
		name: "Giáo dục",
		icon: require("./Assets/Images/Icons/ic_education.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 8,
		name: "Giải trí",
		icon: require("./Assets/Images/Icons/ic_entertainment.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 9,
		name: "Di chuyển",
		icon: require("./Assets/Images/Icons/ic_transport.png"),
		type: "SPEND",
		parent: null,
		children:[14, 15]
	},
	{
		id: 10,
		name: "Du lịch",
		icon: require("./Assets/Images/Icons/ic_travel.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 11,
		name: "Hẹn hò",
		icon: require("./Assets/Images/Icons/ic_dating.png"),
		type: "SPEND",
		parent: null,
	},
	{
		id: 12,
		name: "Được tặng",
		icon: require("./Assets/Images/Icons/ic_cash.png"),
		type: "EARN",
		parent: null,
	},
	{
		id: 13,
		name: "Thưởng",
		icon: require("./Assets/Images/Icons/ic_bonus.png"),
		type: "EARN",
		parent: null,
	},
	{
		id: 14,
		name: "Xăng dầu",
		icon: require("./Assets/Images/Icons/ic_gas.png"),
		type: "SPEND",
		parent: 9,
	},
	{
		id: 15,
		name: "Gửi xe",
		icon: require("./Assets/Images/Icons/ic_parking.png"),
		type: "SPEND",
		parent: 9,
	},
];

export const transaction: ITransaction[] = [
	{
		group: transactionGroup[15],
		money: 5000,
		date: new Date("08/04/2021"),
		description: "",
		wallet: "BAMEBANK",
		images: [{
			image:"./Assets/Images/home.png",
			title: "Test"
		}]
	},
	{
		group: transactionGroup[11],
		money: 150000,
		date: new Date("08/04/2021"),
		description: "Đi với ấy",
		wallet: "NGUOIYEUBANK",
	},
	{
		group: transactionGroup[4],
		money: 150000,
		date: new Date("08/04/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[4],
		money: 150000,
		date: new Date("08/03/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[5],
		money: 3000000,
		date: new Date("08/03/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[14],
		money: 50000,
		date: new Date("08/04/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[6],
		money: 10000000,
		date: new Date("08/04/2021"),
		description: "Trên trời rơi xuống",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[12],
		money: 1000000,
		date: new Date("06/09/2021"),
		description: "Trên trời rơi xuống",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[14],
		money: 50000,
		date: new Date("07/04/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[14],
		money: 50000,
		date: new Date("06/10/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[15],
		money: 5000,
		date: new Date("06/10/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[6],
		money: 10000000,
		date: new Date("06/08/2021"),
		description: "Lương trên trời rơi xuống",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[15],
		money: 5000,
		date: new Date("06/04/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[0],
		money: 100000,
		date: new Date("06/06/2021"),
		description: "Đá dĩa cơm tấm siêu to khổng lồ",
		wallet: "BAMEBANK",
	},

	{
		group: transactionGroup[1],
		money: 100000,
		date: new Date("06/06/2021"),
		description: "Không thích thì mua.  ",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[8],
		money: 100000,
		date: new Date("06/06/2021"),
		description: "Xem phim với ghệ",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[4],
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
	{
		group: transactionGroup[6],
		money: 10000000,
		date: new Date("05/10/2021"),
		description: "Lương trên trời rơi xuống",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[15],
		money: 5000,
		date: new Date("04/30/2021"),
		description: "",
		wallet: "BAMEBANK",
	},
	{
		group: transactionGroup[6],
		money: 11000000,
		date: new Date("04/03/2021"),
		description: "Lương trên trời rơi xuống",
		wallet: "BAMEBANK",
	},
];
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
};

export const notifications: INotification[] = [
	{
		content: "Xem báo cáo tháng 7",
		date: new Date("08/01/2021")
	},
	{
		content: "Xem báo cáo tháng 6",
		date: new Date("07/01/2021")
	}
]

export const plans: IPlanner[] = [
	{
		name: "Du lịch",
		dateStart: new Date("08/01/2021"),
		dateEnd: new Date("08/30/2021"),
		wallet: "NGUOIYEUBANK",
		money: 5000000,
		group: transactionGroup[9]
	},
	{
		name: "Học phí kì 3",
		dateStart: new Date("06/01/2021"),
		dateEnd: new Date("10/01/2021"),
		wallet: "NGUOIYEUBANK",
		money: 10000000,
		group: transactionGroup[7]
	},
	{
		name: "Học phí kì 2",
		dateStart: new Date("02/01/2021"),
		dateEnd: new Date("05/30/2021"),
		wallet: "NGUOIYEUBANK",
		money: 10000000,
		group: transactionGroup[7]
	}
]