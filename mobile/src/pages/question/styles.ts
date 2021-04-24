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
        root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
        },
        message: {
            fontWeight: "bold",
        },
        expression: {
            fontSize: 30,
        },
        form: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
        },
        formInput: {
            flexGrow: 1,
        },
        formSubmit: {
            flexGrow: 0,
            marginLeft: 8,
        },
    });
};
