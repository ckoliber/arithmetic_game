import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Props } from "./props";
import Color from "color";

export const useStyles = (props: Props) => {
    // const theme = useTheme();

    return StyleSheet.create({
        header: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: 5,
            paddingVertical: 20,
            backgroundColor: "#286da8",
        },
        logo: {
            width: 110,
            height: 100,
        },
        title: {
            color: "white",
        },
    });
};
