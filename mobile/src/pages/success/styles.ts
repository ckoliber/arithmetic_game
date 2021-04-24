import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Props } from "./props";
import Color from "color";

export const useStyles = (props: Props) => {
    const theme = useTheme();

    return StyleSheet.create({
        root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 8,
        },
        image: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        imageView: {
            width: 200,
            height: 200,
            margin: 16,
        },
        imageCaption: {
            fontSize: 30,
        },
        message: {
            fontWeight: "bold",
            textAlign: "center",
        },
    });
};
