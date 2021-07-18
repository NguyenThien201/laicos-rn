import { ITransaction, ITransactionGroup } from "./type";

export const transactionGroup: ITransactionGroup[] = [
	{
		id: 1,
		name: "Đua xe",
		icon: require("./Assets/Images/Icons/ic_car_fire.png"),
		type: "SPEND",
		parent: null,
	},
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
		icon: "",
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
        icon: require('./Assets/Images/Icons/ic_salary.png'),
        type: "EARN",
        parent: null
    }
];

export const transaction: ITransaction[] = [
	{
		group: transactionGroup[0],
		money: 100000,
		date: new Date("06/06/2021"),
        description:""
	},
	{
		group: transactionGroup[1],
		money: 10000000,
		date: new Date("06/07/2021"),
        description:""
	},
	{
		group: transactionGroup[3],
		money: 70000,
		date: new Date("06/05/2021"),
        description:""
	},
    {
		group: transactionGroup[3],
		money: 20000,
		date: new Date("06/04/2021"),
        description:""
	},
    {
		group: transactionGroup[7],
		money: 1000000,
		date: new Date("06/01/2021"),
        description:""
	},
	{
		group: transactionGroup[3],
		money: 10000000,
		date: new Date("05/05/2021"),
        description:""
	},
];
