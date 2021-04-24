import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Props } from "./props";
import Color from "color";

export const useStyles = (props: Props) => {
    const theme = useTheme();

    return StyleSheet.create({
        loading: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        error: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        empty: {
            color: "grey",
            alignSelf: "center",
            paddingVertical: "5%",
        },
        expression: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
            paddingVertical: 20,
            fontSize: 64,
        },
        answer: {
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
        },
    });
};
