import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Props } from "./props";
import Color from "color";

export const useStyles = (props: Props) => {
    const theme = useTheme();

    return StyleSheet.create({
        background: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "stretch",
        },
        image: {
            backgroundColor: "black",
            resizeMode: "cover",
            opacity: 0.7,
        },
        title: {
            color: "white",
            fontSize: 42,
            textAlign: "center",
            backgroundColor: "#333333aa",
        },
        content: {
            backgroundColor: Color(theme.colors.background)
                .alpha(0.7)
                .toString(),
        },
    });
};
