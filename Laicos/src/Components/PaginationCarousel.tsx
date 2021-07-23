import React from "react";
import { View } from "react-native";
import { Pagination } from "react-native-snap-carousel";
import { Variable } from "../styles/theme.style";

export const PaginationComponent = ({ items, active }) => {
	return (
		<Pagination
			dotsLength={items.length}
			activeDotIndex={active}
			containerStyle={{ backgroundColor: Variable.BACKGROUND_COLOR }}
			dotStyle={{
				width: 5,
				height: 5,
				borderRadius: 5,
				marginHorizontal: 8,
				backgroundColor: Variable.GREEN_LIGHT_COLOR,
			}}
			inactiveDotStyle={
				{
					// Define styles for inactive dots here
				}
			}
			inactiveDotOpacity={0.4}
			inactiveDotScale={0.6}
		/>
	);
};
